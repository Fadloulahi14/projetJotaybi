import "./style.css";
import { createElement } from "./compenent.js";
import { messagesConversation, } from "./consts.js";
import { state } from "./store.js";
import { basse_url } from "./validateur/fonctionValidate.js";

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
    
   createElement('div', {class: [ "w-8", "h-8", "rounded-full", "border", "border-gray-300", "text-gray-600", "flex", "items-center", "justify-center", "cursor-pointer", "hover:bg-gray-200", "text-black-500"]}, [
     createElement('i', {class: ["fa-solid", "fa-ellipsis-vertical"]}, []),
   ])
  ])
]);

const messagesList = createElement('div', {
  id: 'messages-list',
  class: ["flex-1", "overflow-y-auto", "px-4", "py-4", "space-y-4", "bg-[#f0f2f5]"]
}, []);

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
        loadMessages();
      } catch (error) {
        console.error('Erreur envoi message:', error);
      }
    }
  }, [
    createElement('i', { class: ["fa-solid", "fa-paper-plane"] })
  ])
]);

const pgrandBr = createElement("div", {
  id: "bare2",
  class: ["flex-1", "h-full", "flex", "flex-col", "bg-[#f0f2f5]"]
}, [header, messagesList, footer]);

export  {pgrandBr};