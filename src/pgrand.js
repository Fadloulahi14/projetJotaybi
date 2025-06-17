import "./style.css";
import { createElement } from "./compenent.js";
import { state } from "./store.js";
import { basse_url } from "./validateur/fonctionValidate.js";
import { groupeConversationManager } from "./fonctionGrbarr/groupeConversation.js";
import { conversationManager } from "./fonctionGrbarr/conversation.js";
import { conversationMenuManager } from "./fonctionGrbarr/conversationMenu.js";

// Fonction pour charger les messages
async function loadMessages() {
  const messagesList = document.querySelector('#messages-list');
  if (!messagesList || !state.selectedContact) return;

  try {
    const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    const response = await fetch(`${basse_url}/messages`);
    const allMessages = await response.json();

    const conversationMessages = allMessages.filter(m => 
      (m.emetteur === moi.id && m.recepteur === state.selectedContact.id) ||
      (m.emetteur === state.selectedContact.id && m.recepteur === moi.id)
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

// Ajouter la fonction de rafraîchissement automatique
let refreshInterval;

function startAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  
  refreshInterval = setInterval(() => {
    if (state.selectedContact && state.selectedContact.type !== 'groupe') {
      loadMessages();
    }
  }, 3000);
}

function stopAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
}

// Créer l'en-tête de la conversation
const header = createElement('div', {
  class: ["w-full", "h-16", "border-b", "border-gray-200", "flex", "items-center", "justify-between", "px-4", "bg-white"]
}, [
  createElement('div', {
    class: ["flex", "items-center", "gap-3", "flex-1"]
  }, [
    createElement('div', {
      class: ["w-10", "h-10", "bg-gray-300", "rounded-full"]
    }),
    createElement('h5', { 
      id: "contact-header-name",
      class: ["font-semibold", "text-gray-900"] 
    }, ['Sélectionnez une conversation'])
  ]),
  createElement('div', {
    class: ["flex", "items-center", "gap-2"]
  }, [
   createElement('div', {class: [ "w-8", "h-8", "rounded-full", "border", "border-gray-300", "text-gray-600", "flex", "items-center", "justify-center", "cursor-pointer", "hover:bg-gray-200", "text-red-500"]}, [
     createElement('i', {class: ["fa-solid", "fa-video"]}, []),
   ]), 
    createElement('div', {class: [ "w-8", "h-8", "rounded-full", "border", "border-gray-300", "text-gray-600", "flex", "items-center", "justify-center", "cursor-pointer", "hover:bg-gray-200", "text-green-500"]}, [
     createElement('i', {class: ["fa-solid", "fa-phone"]}, []),
   ]),
    
   createElement('div', {
    class: [ 
      "w-8", "h-8", "rounded-full", "border", "border-gray-300", 
      "text-gray-600", "flex", "items-center", "justify-center", 
      "cursor-pointer", "hover:bg-gray-200", "text-black-500"
    ],
    onClick: (e) => {
      e.stopPropagation();
      if (state.selectedContact) {
        conversationMenuManager.showMenu(
          state.selectedContact.type,
          state.selectedContact
        );
      }
    }
  }, [
     createElement('i', {
      class: ["fa-solid", "fa-ellipsis-vertical"]
    }, [])
   ])
  ])
]);

const messagesList = createElement('div', {
  id: 'messages-list',
  class: ["flex-1", "overflow-y-auto", "px-4", "py-4", "space-y-4", "bg-[#f0f2f5]"]
}, []);


// Modifier le footer pour inclure la fonction loadMessages
const footer = createElement('div', {
  class: ["w-full", "h-16", "bg-white", "border-t", "border-gray-200", "flex", "items-center", "gap-3", "px-4"]
}, [
  createElement('div', {
    class: ["flex-1", "relative"]
  }, [
    createElement('input', {
      id: 'message-input',
      type: 'text',
      placeholder: 'Entrez un message',
      class: ["w-full", "py-2", "px-4", "bg-gray-100", "rounded-full", "border-none", "outline-none", "text-sm"]
    }),
    createElement('div', {
      class: ["absolute", "right-3", "top-1/2", "transform", "-translate-y-1/2", "flex", "gap-2"]
    }, [
      createElement('i', {
        class: ["fa-solid", "fa-paperclip", "text-gray-500", "cursor-pointer", "hover:text-gray-700"]
      }, []),
      createElement('i', {
        class: ["fa-solid", "fa-camera", "text-gray-500", "cursor-pointer", "hover:text-gray-700"]
      }, [])
    ])
  ]),
  createElement('button', {
    id: 'send-message',
    class: ["w-10", "h-10", "rounded-full", "bg-green-500", "text-white", "flex", "items-center", "justify-center", "cursor-pointer", "hover:bg-green-600"],
    onClick: async () => {
      const input = document.querySelector('#message-input');
      const message = input.value.trim();
      
      if (!message || !state.selectedContact) return;

      const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
      
      try {
        if (state.selectedContact.type === 'groupe') {
          await groupeConversationManager.sendGroupMessage(
            state.selectedContact.id,
            message
          );

          // Rafraîchir les conversations après l'envoi
          await conversationManager.chargerConversations();
        } else {
          await fetch(`${basse_url}/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              emetteur: moi.id,
              recepteur: state.selectedContact.id,
              contenu: message,
              date: new Date().toISOString(),
              lu: false
            })
          });

          input.value = '';
          await loadMessages();
          // Rafraîchir les conversations après l'envoi
          await conversationManager.chargerConversations();
        }
      } catch (error) {
        console.error('Erreur envoi message:', error);
      }
    }
  }, [
    createElement('i', { class: ["fa-solid", "fa-paper-plane"] })
  ])
]);

// Modifier le state pour gérer le rafraîchissement
state.onContactSelected = (contact) => {
  state.selectedContact = contact;
  loadMessages();
  startAutoRefresh();
};

// Nettoyer l'intervalle quand l'utilisateur quitte la page
window.addEventListener('beforeunload', stopAutoRefresh);

const pgrandBr = createElement("div", {
  id: "bare2",
  class: ["flex-1", "h-full", "flex", "flex-col", "bg-[#f0f2f5]"]
}, [header, messagesList, footer]);

export { pgrandBr };