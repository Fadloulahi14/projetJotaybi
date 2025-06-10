

import "./style.css";
import { createElement } from "./compenent.js";
import { messagesConversation, } from "./consts.js";

const zoneMessages = createElement('div', {
  class: ["flex-1", "overflow-y-auto", "px-4", "py-4", "space-y-4", "bg-[#f0f2f5]"]
}, messagesConversation.map(msg => {
  if (msg.jour) {
    return createElement('div', { class: ["text-center", "my-4"] }, [
      createElement('span', { 
        class: ["bg-white", "px-3", "py-1", "rounded-full", "text-xs", "text-gray-600", "shadow-sm"] 
      }, [msg.jour])
    ]);
  }
  
  const isMe = msg.isMe;
  return createElement('div', {
    class: ["flex", isMe ? "justify-end" : "justify-start", "mb-2"]
  }, [
    createElement('div', {
      class: [
        "max-w-xs", "px-3", "py-2", "rounded-lg", "relative",
        isMe ? "bg-green-500 text-white" : "bg-white text-gray-800",
        "shadow-sm"
      ]
    }, [
      msg.type === 'image' ? 
        createElement('img', {
          src: '/api/placeholder/200/150',
          class: ["rounded", "w-full", "max-w-[200px]"]
        }) :
      msg.type === 'link' ?
        createElement('div', { class: ["space-y-2"] }, [
          createElement('div', { 
            class: ["text-sm", "font-semibold", isMe ? "text-white" : "text-gray-900"] 
          }, [msg.contenu]),
          createElement('a', {
            href: msg.lien,
            class: ["text-xs", "underline", isMe ? "text-green-100" : "text-blue-600"]
          }, [msg.lien])
        ]) :
        createElement('span', { class: ["text-sm"] }, [msg.contenu]),
        
      createElement('div', {
        class: ["text-xs", "mt-1", "opacity-70", "text-right"]
      }, [
        msg.temps,
        isMe && createElement('i', { 
          class: ["fa-solid", "fa-check-double", "ml-1", "text-blue-200"] 
        }, [])
      ])
    ])
  ]);
}));

const header = createElement('div', {
  class: ["w-full", "h-16", "border-b", "border-gray-200", "flex", "items-center", "justify-between", "px-4", "bg-white"]
}, [
  createElement('div', {
    class: ["flex", "items-center", "gap-3", "flex-1"]
  }, [
    createElement('div', {
      class: ["w-10", "h-10", "bg-gray-300", "rounded-full"]
    }),
    createElement('h5', { class: ["font-semibold", "text-gray-900"] }, ['mum'])
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

const body = createElement('div', {
  class: ["flex-1", "flex", "flex-col", "bg-[#f0f2f5]"]
}, [zoneMessages]);

const footer = createElement('div', {
  class: ["w-full", "h-16", "bg-white", "border-t", "border-gray-200", "flex", "items-center", "gap-3", "px-4"]
}, [
  createElement('div', {
    class: ["flex-1", "relative"]
  }, [
    createElement('input', {
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
    class: ["w-10", "h-10", "rounded-full", "bg-green-500", "text-white", "flex", "items-center", "justify-center", "cursor-pointer", "hover:bg-green-600"]
  }, [
    createElement('i', { class: ["fa-solid", "fa-microphone"] }, [])
  ])
]);

const pgrandBr = createElement("div", {
  id: "bare2",
  class: ["flex-1", "h-full", "flex", "flex-col", "bg-[#f0f2f5]"]
}, [header, body, footer]);

export  {pgrandBr};