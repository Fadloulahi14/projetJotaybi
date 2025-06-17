import { createElement } from "../compenent.js";
import { basse_url } from "../validateur/fonctionValidate.js";
import { selectContact } from "../store.js";
import { groupeConversationManager } from "./groupeConversation.js";

class ConversationManager {
  constructor() {
    this.listeConversations = createElement("div", {
      id: "liste-conversations",
      class: ["flex-1", "overflow-y-auto"]
    });
    
    this.init();

    // Écouter les changements de groupes
    window.addEventListener('groupeCreated', () => {
      this.chargerConversations();
    });
  }

  init() {
    const utilisateurConnecte = JSON.parse(localStorage.getItem("utilisateurConnecte"));
    
    if (!utilisateurConnecte?.id) {
      this.afficherMessageConnexion();
    } else {
      this.utilisateurTrouver = utilisateurConnecte;
      this.chargerConversations();
    }
  }

  afficherMessageConnexion() {
    this.listeConversations.innerHTML = `
      <div class="flex items-center justify-center h-full text-gray-500">
        <span>Aucune conversation disponible</span>
      </div>
    `;
  }

  // Ajout de la méthode prepareConversationsIndividuelles
  prepareConversationsIndividuelles(contacts, messages, moi) {
    return contacts.map(contact => {
      const conversationMessages = messages.filter(m => 
        (m.emetteur === moi.id && m.recepteur === contact.id) ||
        (m.emetteur === contact.id && m.recepteur === moi.id)
      ).sort((a, b) => new Date(b.date) - new Date(a.date));

      return {
        id: contact.id,
        nom: `${contact.prenom} ${contact.nom}`,
        type: 'individuel',
        dernierMessage: conversationMessages[0],
        nonLus: conversationMessages.filter(m => 
          m.emetteur === contact.id && !m.lu
        ).length
      };
    });
  }

  async chargerConversations() {
    try {
      const [utilisateurs, messages, groupes] = await Promise.all([
        fetch(`${basse_url}/utilisateurs`).then(res => res.json()),
        fetch(`${basse_url}/messages`).then(res => res.json()),
        fetch(`${basse_url}/groupes`).then(res => res.json())
      ]);

      const moi = utilisateurs.find(u => u.id === this.utilisateurTrouver.id);
      
      // Conversations individuelles
      const contacts = utilisateurs.filter(u => moi.contact?.includes(u.id));
      const conversationsIndividuelles = this.prepareConversationsIndividuelles(contacts, messages, moi);
      
      // Conversations de groupe
      const conversationsGroupe = this.prepareConversationsGroupe(groupes, moi);
      
      // Fusionner et trier toutes les conversations
      const toutesConversations = [...conversationsIndividuelles, ...conversationsGroupe]
        .sort((a, b) => new Date(b.dernierMessage?.date || 0) - new Date(a.dernierMessage?.date || 0));

      this.renderConversations(toutesConversations);

    } catch (error) {
      console.error("Erreur lors du chargement des conversations:", error);
      this.afficherErreur();
    }
  }

  prepareConversationsGroupe(groupes, moi) {
    return groupes
      .filter(g => g.membres?.includes(moi.id))
      .map(groupe => ({
        id: groupe.id,
        nom: groupe.nom,
        type: 'groupe',
        dernierMessage: groupe.messages?.[groupe.messages.length - 1],
        photo: groupe.photo,
        membres: groupe.membres,
        admin: groupe.admin
      }));
  }

  afficherErreur() {
    this.listeConversations.innerHTML = `
      <div class="flex items-center justify-center h-full text-red-500">
        Une erreur est survenue
      </div>
    `;
  }

  renderConversations(conversations) {
    this.listeConversations.innerHTML = "";
    
    conversations.forEach(conv => {
      const element = createElement("div", {
        class: [
          "flex", "items-center", "gap-3", "px-4", "py-3",
          "hover:bg-gray-50", "cursor-pointer", "border-b", "border-gray-100",
          "relative" // Ajout de relative pour positionner le badge
        ],
        onClick: async () => {
          selectContact(conv);
          if (conv.type === 'groupe') {
            await groupeConversationManager.loadGroupMessages(conv.id);
          } else {
            await this.loadMessages(conv.id);
          }
          // Après avoir chargé les messages, on rafraîchit les conversations
          await this.chargerConversations();
        }
      }, [
        // Avatar avec badge de notification
        createElement("div", {
          class: ["relative"] // Container pour l'avatar et le badge
        }, [
          // Avatar
          createElement("div", {
            class: [
              "w-12", "h-12", "rounded-full",
              conv.type === 'groupe' ? "bg-green-100" : "bg-gray-300",
              "flex-shrink-0", "flex", "items-center", "justify-center"
            ]
          }, [
            createElement("i", {
              class: [
                "fas",
                conv.type === 'groupe' ? "fa-users" : "fa-user",
                conv.type === 'groupe' ? "text-green-600" : "text-gray-600"
              ]
            })
          ]),
          // Badge de notification (affiché uniquement s'il y a des messages non lus)
          (conv.nonLus > 0) && createElement("div", {
            class: [
              "absolute", "-top-1", "-right-1",
              "bg-green-500", "text-white",
              "rounded-full", "w-5", "h-5",
              "flex", "items-center", "justify-center",
              "text-xs", "font-medium"
            ]
          }, [conv.nonLus.toString()])
        ]),
        
        // Infos conversation
        createElement("div", { 
          class: ["flex-1", "min-w-0"] 
        }, [
          createElement("div", {
            class: ["flex", "justify-between", "items-center"]
          }, [
            createElement("h3", { 
              class: ["font-semibold", "text-gray-900", "truncate"] 
            }, [conv.nom]),
            conv.dernierMessage && createElement("span", {
              class: ["text-xs", "text-gray-500"]
            }, [
              new Date(conv.dernierMessage.date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })
            ])
          ]),
          createElement("p", { 
            class: ["text-sm", "text-gray-600", "truncate"] 
          }, [
            conv.type === 'groupe' && conv.dernierMessage ? 
              `${conv.dernierMessage.nomEmetteur}: ${conv.dernierMessage.contenu}` :
              conv.dernierMessage?.contenu || "Aucun message"
          ])
        ])
      ]);
      
      this.listeConversations.appendChild(element);
    });
  }

  async loadMessages(contactId) {
    const messagesList = document.querySelector('#messages-list');
    const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));

    try {
      const response = await fetch(`${basse_url}/messages`);
      const allMessages = await response.json();

      const conversationMessages = allMessages.filter(m => 
        (m.emetteur === moi.id && m.recepteur === contactId) ||
        (m.emetteur === contactId && m.recepteur === moi.id)
      ).sort((a, b) => new Date(a.date) - new Date(b.date));

      // Marquer les messages comme lus
      const unreadMessages = conversationMessages.filter(m => 
        m.emetteur === contactId && !m.lu
      );

      if (unreadMessages.length > 0) {
        await Promise.all(unreadMessages.map(msg =>
          fetch(`${basse_url}/messages/${msg.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lu: true })
          })
        ));
      }

      if (messagesList) {
        messagesList.innerHTML = '';
        
        conversationMessages.forEach(msg => {
          const isMe = msg.emetteur === moi.id;
          const messageElement = createElement('div', {
            class: ["flex", isMe ? "justify-end" : "justify-start", "mb-2"]
          }, [
            createElement('div', {
              class: [
                "max-w-xs", "px-3", "py-2", "rounded-lg",
                isMe ? "bg-green-500 text-white" : "bg-white text-gray-800",
                "shadow-sm"
              ]
            }, [
              createElement('span', { 
                class: ["text-sm"] 
              }, [msg.contenu]),
              createElement('div', {
                class: ["text-xs", "mt-1", "opacity-70", "text-right"]
              }, [
                new Date(msg.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              ])
            ])
          ]);
          
          messagesList.appendChild(messageElement);
        });

        messagesList.scrollTop = messagesList.scrollHeight;
      }
    } catch (error) {
      console.error('Erreur chargement messages:', error);
    }
  }
}

const conversationManager = new ConversationManager();
export { conversationManager };