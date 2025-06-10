import "./style.css";
import { createElement } from "./compenent.js";
import { conversations} from "./consts.js";


const onglets = createElement("div", {
  class: ["flex", "gap-4", "px-4", "py-2", "text-sm"]
}, [
  createElement("span", { class: ["text-green-600", "font-semibold"] }, ["Toutes"]),
  createElement("span", { class: ["text-gray-600", "cursor-pointer"] }, ["Non lues"]),
  createElement("span", { class: ["text-gray-600", "cursor-pointer"] }, ["Favoris"]),
  createElement("span", { class: ["text-gray-600", "cursor-pointer"] }, ["Groupes"])
]);

// Section Archivées
const sectionArchivees = createElement("div", {
  class: ["flex", "items-center", "justify-between", "px-4", "py-3", "hover:bg-gray-50", "cursor-pointer"]
}, [
  createElement("div", { class: ["flex", "items-center", "gap-3"] }, [
    createElement("div", {
      class: ["w-10", "h-10", "bg-gray-300", "rounded-full", "flex", "items-center", "justify-center"]
    }, [
      createElement("i", { class: ["fa-solid", "fa-archive", "text-gray-600"] }, [])
    ]),
    createElement("span", { class: ["font-medium"] }, ["Archivées"])
  ]),
  createElement("div", {
    class: ["bg-green-500", "text-white", "text-xs", "rounded-full", "w-6", "h-6", "flex", "items-center", "justify-center"]
  }, ["41"])
]);




const listeConversations = createElement("div", {
  class: ["flex-1", "overflow-y-auto"]
}, conversations.map(conv => 
  createElement("div", {
    class: ["flex", "items-center", "gap-3", "px-4", "py-3", "hover:bg-gray-50", "cursor-pointer", "border-b", "border-gray-100"]
  }, [
    createElement("div", {
      class: ["w-12", "h-12", "bg-gray-300", "rounded-full", "flex-shrink-0"]
    }),
    createElement("div", { class: ["flex-1", "min-w-0"] }, [
      createElement("div", { class: ["flex", "justify-between", "items-center"] }, [
        createElement("h3", { 
          class: ["font-semibold", "text-gray-900", "truncate"] 
        }, [conv.nom]),
        createElement("div", { class: ["flex", "items-center", "gap-1"] }, [
          conv.pin && createElement("i", { class: ["fa-solid", "fa-thumbtack", "text-gray-400", "text-xs", "rotate-45"] }, []),
          createElement("span", { class: ["text-xs", "text-gray-500"] }, [conv.temps])
        ])
      ]),
      createElement("div", { class: ["flex", "justify-between", "items-center", "mt-1"] }, [
        createElement("p", { 
          class: ["text-sm", "text-gray-600", "truncate", "max-w-[200px]"] 
        }, [conv.message || ""]),
        conv.unread && createElement("div", {
          class: ["bg-green-500", "text-white", "text-xs", "rounded-full", "w-5", "h-5", "flex", "items-center", "justify-center", "flex-shrink-0"]
        }, ["1"])
      ])
    ])
  ])
));

const entete1 = createElement("div", {
  id: "header",
  class: ["w-full", "h-16", "flex", "items-center", "justify-between", "px-4", "border-b", "border-gray-200"]
}, [
  createElement("h3", { class: ["text-xl", "font-semibold"] }, ["Discussions"]),
  createElement("div", { class: ["flex", "gap-2"] }, [
    createElement("i", { 
      class: ["fa-solid", "fa-qrcode", "text-gray-600", "cursor-pointer", "p-2", "hover:bg-gray-100", "rounded"] 
    }, []),
    createElement("i", { 
      class: ["fa-solid", "fa-ellipsis-vertical", "text-gray-600", "cursor-pointer", "p-2", "hover:bg-gray-100", "rounded"] 
    }, [])
  ])
]);

const recherche = createElement("div", {
  id: "recherche",
  class: ["px-4", "py-2", "border-b", "border-gray-200"]
}, [
  createElement("div", {
    class: ["relative"]
  }, [
    createElement("i", {
      class: ["fa-solid", "fa-search", "absolute", "left-3", "top-1/2", "transform", "-translate-y-1/2", "text-gray-400"]
    }, []),
    createElement('input', {
      type: 'text',
      placeholder: 'Rechercher',
      class: ["w-full", "pl-10", "pr-4", "py-2", "bg-gray-100", "rounded-lg", "border-none", "outline-none", "text-sm"]
    })
  ])
]);

const sectionGroupes = createElement("div", {
  id: "section-groupes",
  class: "w-full mt-4 px-4 space-y-4",
});

const listContact = createElement('div', {
  id: "liste-contacts",
  class: "w-full px-4 space-y-2 mt-4",
}, []);

const zoneFormulaire = createElement("div", {
  id: "zone-formulaire",
  class: "flex flex-col items-start mt-2"
});

const grandBr = createElement("div", {
  id: "bare1",
  class: ["w-[35%]", "h-full", "bg-white", "flex", "flex-col", "border-r", "border-gray-200"]
}, [entete1, recherche, onglets, sectionArchivees, listeConversations, zoneFormulaire, listContact, sectionGroupes]);


export{grandBr};