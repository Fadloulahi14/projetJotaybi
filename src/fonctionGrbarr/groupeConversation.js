import { createElement } from "../compenent.js";
import { basse_url } from "../validateur/fonctionValidate.js";
import { conversationManager } from "./conversation.js";

class GroupeConversationManager {
  constructor() {
    this.currentGroup = null;
    this.messagesList = null;
    this.isLoading = false;
    this.messages = new Map(); // Pour stocker les messages par groupe
  }

  async loadGroupMessages(groupId) {
    if (this.isLoading) return;
    this.isLoading = true;

    try {
      const response = await fetch(`${basse_url}/groupes/${groupId}`);
      const groupe = await response.json();
      
      if (!groupe) return;

      this.currentGroup = groupe;
      this.messagesList = document.querySelector('#messages-list');
      const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));

      if (!this.messagesList) return;
      
      // Stocker les messages du groupe
      this.messages.set(groupId, groupe.messages || []);
      
      this.messagesList.innerHTML = '';

      if (groupe.messages && groupe.messages.length > 0) {
        const sortedMessages = [...groupe.messages].sort((a, b) => 
          new Date(a.date) - new Date(b.date)
        );

        sortedMessages.forEach(msg => {
          const isMe = msg.emetteur === moi.id;
          const messageElement = this.createMessageElement(msg, isMe);
          this.messagesList.appendChild(messageElement);
        });
      }

      this.messagesList.scrollTop = this.messagesList.scrollHeight;

    } catch (error) {
      console.error('Erreur chargement messages groupe:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async sendGroupMessage(groupId, message) {
    if (!message.trim() || !groupId) return;

    const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    
    try {
      // Récupérer les messages stockés localement
      let groupMessages = this.messages.get(groupId) || [];
      
      const newMessage = {
        id: Date.now().toString(),
        emetteur: moi.id,
        nomEmetteur: `${moi.prenom} ${moi.nom}`,
        contenu: message,
        date: new Date().toISOString()
      };

      // Ajouter le message localement
      groupMessages.push(newMessage);
      this.messages.set(groupId, groupMessages);

      // Mettre à jour le serveur
      await fetch(`${basse_url}/groupes/${groupId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: groupMessages
        })
      });

      // Ajouter le message à l'interface
      if (this.currentGroup && this.currentGroup.id === groupId && this.messagesList) {
        const messageElement = this.createMessageElement(newMessage, true);
        this.messagesList.appendChild(messageElement);
        this.messagesList.scrollTop = this.messagesList.scrollHeight;
      }

      // Mettre à jour la conversation dans la liste sans recharger les messages
      await conversationManager.chargerConversations();

    } catch (error) {
      console.error('Erreur envoi message groupe:', error);
    }
  }

  createMessageElement(msg, isMe) {
    return createElement('div', {
      class: ["flex", isMe ? "justify-end" : "justify-start", "mb-2"]
    }, [
      createElement('div', {
        class: [
          "max-w-xs", "px-3", "py-2", "rounded-lg",
          isMe ? "bg-green-500 text-white" : "bg-white text-gray-800",
          "shadow-sm"
        ]
      }, [
        !isMe && createElement('div', {
          class: ["text-xs", "font-medium", "mb-1", "text-green-600"]
        }, [msg.nomEmetteur || "Utilisateur"]),
        
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
  }
}

export const groupeConversationManager = new GroupeConversationManager();