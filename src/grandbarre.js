import "./style.css";
import { createElement } from "./compenent.js";
import { conversationManager } from "./fonctionGrbarr/conversation.js";
import { entete1 } from "./fonctionGrbarr/entete.js";

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


const onglets = createElement("div", {
  class: ["flex", "gap-4", "px-4", "py-2", "text-sm"]
}, [
  createElement("span", { class: ["text-green-600", "font-semibold"] }, ["Toutes"]),
  createElement("span", { class: ["text-gray-600", "cursor-pointer"] }, ["Non lues"]),
  createElement("span", { class: ["text-gray-600", "cursor-pointer"] }, ["Favoris"]),
  createElement("span", { class: ["text-gray-600", "cursor-pointer"] }, ["Groupes"])
]);


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
}, [
  entete1, 
  recherche,
  onglets,
  conversationManager.listeConversations
]);

conversationManager.init();

export { grandBr };