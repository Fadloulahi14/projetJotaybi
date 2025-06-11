import { createElement } from "../compenent";
import { basse_url } from "../validateur/fonctionValidate.js";

// État global
let isMenuOpen = false;
let isContactSelectionOpen = false;
let contacts = [];

// Fonction pour charger les contacts
async function chargerContacts() {
  try {
    const utilisateurConnecte = JSON.parse(localStorage.getItem("utilisateurConnecte"));
    if (!utilisateurConnecte) return;

    const response = await fetch(`${basse_url}/utilisateurs`);
    const utilisateurs = await response.json();

    contacts = utilisateurs.filter(user => 
      utilisateurConnecte.contact.includes(user.id)
    ).map(contact => ({
      id: contact.id,
      name: `${contact.prenom} ${contact.nom}`,
      phone: contact.telephone,
      message: "Salut ! J'utilise WhatsApp.",
      avatar: "/api/placeholder/40/40"
    }));

    contacts.unshift({
      id: utilisateurConnecte.id,
      name: `${utilisateurConnecte.prenom} ${utilisateurConnecte.nom}`,
      status: "(vous)",
      message: "Envoyez-vous un message",
      avatar: "/api/placeholder/40/40",
      isYou: true
    });

    updateContactList();
  } catch (error) {
    console.error("Erreur lors du chargement des contacts:", error);
  }
}

function updateContactList() {
  const contactList = document.querySelector('#contact-list');
  if (contactList) {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
      const contactElement = createContactItem(contact);
      contactList.appendChild(contactElement);
    });
  }
}

function toggleMenu() {
  const popup = document.querySelector('#menu-popup');
  if (popup) {
    if (isMenuOpen) {
      popup.classList.add('hidden');
      popup.classList.remove('block');
      isMenuOpen = false;
    } else {
      popup.classList.remove('hidden');
      popup.classList.add('block');
      isMenuOpen = true;
    }
  }
}

function toggleContactSelection() {
  const popup = document.querySelector('#contact-selection-popup');
  if (popup) {
    if (isContactSelectionOpen) {
      popup.classList.add('hidden');
      popup.classList.remove('block');
      isContactSelectionOpen = false;
    } else {
      popup.classList.remove('hidden');
      popup.classList.add('block');
      isContactSelectionOpen = true;
    }
  }
}

function createContactItem(contact) {
  return createElement("div", {
    class: [
      "flex", "items-center", "px-6", "py-4", 
      "hover:bg-gray-50", "cursor-pointer", 
      "transition-colors", "duration-150"
    ],
    onClick: () => {
      console.log(`Contact sélectionné: ${contact.name}`);
      toggleContactSelection();
    }
  }, [
    createElement("div", {
      class: [
        "w-12", "h-12", "rounded-full", "bg-gray-200",
        "flex", "items-center", "justify-center",
        "border-2", "border-white", "shadow-sm"
      ]
    }, [
      createElement("i", {
        class: ["fas", "fa-user", "text-gray-400", "text-lg"]
      }, [])
    ]),
    
    createElement("div", {
      class: ["ml-4", "flex-1"]
    }, [
      createElement("div", {
        class: ["flex", "items-center", "justify-between"]
      }, [
        createElement("h4", {
          class: ["font-medium", "text-gray-900"]
        }, [contact.name]),
        ...(contact.isYou ? [
          createElement("span", {
            class: [
              "text-sm", "text-gray-500", "bg-gray-100",
              "px-2", "py-1", "rounded-full"
            ]
          }, [contact.status])
        ] : [])
      ]),
      
      createElement("p", {
        class: ["text-sm", "text-gray-500", "mt-1"]
      }, [contact.message])
    ])
  ]);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  chargerContacts();
});

document.addEventListener('click', function(e) {
  const menuContainer = document.querySelector('#menu-container');
  const popup = document.querySelector('#menu-popup');
  if (menuContainer && popup && !menuContainer.contains(e.target) && isMenuOpen) {
    popup.classList.add('hidden');
    popup.classList.remove('block');
    isMenuOpen = false;
  }
  
  const contactContainer = document.querySelector('#contact-selection-container');
  const contactPopup = document.querySelector('#contact-selection-popup');
  if (contactContainer && contactPopup && !contactContainer.contains(e.target) && isContactSelectionOpen) {
    contactPopup.classList.add('hidden');
    contactPopup.classList.remove('block');
    isContactSelectionOpen = false;
  }
});

export { 
  chargerContacts, 
  toggleMenu, 
  toggleContactSelection,
  createContactItem
};