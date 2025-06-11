import { createElement } from "../compenent.js";
import { basse_url } from "../validateur/fonctionValidate.js";

const utilisateurTrouver = JSON.parse(localStorage.getItem("utilisateurConnecte"));
const idUtilisateur = utilisateurTrouver.id;

async function chargerConversations() {
  const utilisateurs = await (await fetch(`${basse_url}/utilisateurs`)).json();
  const messages = await (await fetch(`${basse_url}/messages`)).json();
  const moi = utilisateurs.find(u => u.id === idUtilisateur);
  const contacts = utilisateurs.filter(u => moi.contact.includes(u.id));

  const convs = contacts.map(contact => {
    const messagesEntreEux = messages.filter(m =>
      (m.emetteur === moi.id && m.recepteur === contact.id) ||
      (m.emetteur === contact.id && m.recepteur === moi.id)
    );
    const dernierMessage = messagesEntreEux[messagesEntreEux.length - 1];

    return {
      id: contact.id,
      nom: contact.prenom + " " + contact.nom,
      message: dernierMessage?.contenu || "",
      temps: dernierMessage ? new Date(dernierMessage.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
      unread: false,
      pin: false
    };
  });

  const elements = convs.map(conv => 
    createElement("div", {
      class: ["flex", "items-center", "gap-3", "px-4", "py-3", "hover:bg-gray-50", "cursor-pointer", "border-b", "border-gray-100"],
      onClick: () => {
        console.log("Contact sélectionné:", conv.id);
      }
    }, [
      createElement("div", {
        class: ["w-12", "h-12", "bg-gray-300", "rounded-full", "flex-shrink-0", "flex", "items-center", "justify-center"]
      }, [
        createElement("i", {
          class: ["fas", "fa-user", "text-gray-600"]
        })
      ]),
      createElement("div", { class: ["flex-1", "min-w-0"] }, [
        createElement("div", { class: ["flex", "justify-between", "items-center"] }, [
          createElement("h3", { 
            class: ["font-semibold", "text-gray-900", "truncate"] 
          }, [conv.nom]),
          createElement("div", { class: ["flex", "items-center", "gap-1"] }, [
            conv.pin && createElement("i", { class: ["fa-solid", "fa-thumbtack", "text-gray-400", "text-xs", "rotate-45"] }),
            createElement("span", { class: ["text-xs", "text-gray-500"] }, [conv.temps])
          ])
        ]),
        createElement("div", { class: ["flex", "justify-between", "items-center", "mt-1"] }, [
          createElement("p", { 
            class: ["text-sm", "text-gray-600", "truncate", "max-w-[200px]"] 
          }, [conv.message]),
          conv.unread && createElement("div", {
            class: ["bg-green-500", "text-white", "text-xs", "rounded-full", "w-5", "h-5", "flex", "items-center", "justify-center"]
          }, ["1"])
        ])
      ])
    ])
  );

  listeConversations.innerHTML = ""; 
  elements.forEach(e => listeConversations.appendChild(e));
}

const listeConversations = createElement("div", {
  id: "liste-conversations",
  class: ["flex-1", "overflow-y-auto"]
});

export {chargerConversations, listeConversations}