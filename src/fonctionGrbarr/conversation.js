import { createElement } from "../compenent.js";
import { basse_url } from "../validateur/fonctionValidate.js";
import { selectContact } from "../store.js";

class ConversationManager {
  constructor() {
    this.listeConversations = createElement("div", {
      id: "liste-conversations",
      class: ["flex-1", "overflow-y-auto"]
    });
    
    this.init();
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

  async chargerConversations() {
    try {
      const [utilisateurs, messages] = await Promise.all([
        fetch(`${basse_url}/utilisateurs`).then(res => res.json()),
        fetch(`${basse_url}/messages`).then(res => res.json())
      ]);

      const moi = utilisateurs.find(u => u.id === this.utilisateurTrouver.id);
      if (!moi?.contact?.length) {
        this.afficherMessageConnexion();
        return;
      }

      const contacts = utilisateurs.filter(u => moi.contact.includes(u.id));
      this.renderConversations(contacts, messages, moi);

    } catch (error) {
      console.error("Erreur lors du chargement des conversations:", error);
      this.afficherErreur();
    }
  }

  afficherErreur() {
    this.listeConversations.createElement('div',{class:["flex items-center justify-center h-full text-red-500"]}, ["une erreure est survenue"])
    // `
    //   <div class="flex items-center justify-center h-full text-red-500">
    //     Une erreur est survenue
    //   </div>
    // `;
  }

  renderConversations(contacts, messages, moi) {
    this.listeConversations.innerHTML = "";
    
    const conversations = contacts.map(contact => {
      const messagesEntreEux = messages.filter(m =>
        (m.emetteur === moi.id && m.recepteur === contact.id) ||
        (m.emetteur === contact.id && m.recepteur === moi.id)
      ).sort((a, b) => new Date(b.date) - new Date(a.date));

      const dernierMessage = messagesEntreEux[0];

      return {
        id: contact.id,
        nom: `${contact.prenom} ${contact.nom}`,
        message: dernierMessage?.contenu || "Aucun message",
        temps: dernierMessage ? new Date(dernierMessage.date)
          .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
      };
    });

    conversations.forEach(conv => this.creerElementConversation(conv));
  }

  creerElementConversation(conv) {
    const element = createElement("div", {
      class: [
        "flex", "items-center", "gap-3", "px-4", "py-3",
        "hover:bg-gray-50", "cursor-pointer", "border-b", "border-gray-100"
      ],
      onClick: () => {
        selectContact(conv);
        this.loadMessages(conv.id);
      }
    }, [
      createElement("div", {
        class: [
          "w-12", "h-12", "bg-gray-300", "rounded-full",
          "flex-shrink-0", "flex", "items-center", "justify-center"
        ]
      }, [
        createElement("i", {
          class: ["fas", "fa-user", "text-gray-600"]
        })
      ]),
      createElement("div", { 
        class: ["flex-1", "min-w-0"] 
      }, [
        createElement("h3", { 
          class: ["font-semibold", "text-gray-900", "truncate"] 
        }, [conv.nom]),
        createElement("p", { 
          class: ["text-sm", "text-gray-600", "truncate"] 
        }, [conv.message])
      ])
    ]);
    
    this.listeConversations.appendChild(element);
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
    } catch (error) {
      console.error('Erreur chargement messages:', error);
    }
  }
}

const conversationManager = new ConversationManager();

// Exporter uniquement l'instance
export { conversationManager };