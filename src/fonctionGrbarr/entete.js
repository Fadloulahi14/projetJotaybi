import { createElement } from "../compenent";
import { basse_url } from "../validateur/fonctionValidate.js";
import { handleNouveauContact } from "./nouveauContact.js";

// État du menu
let isMenuOpen = false;
let isContactSelectionOpen = false;
let contacts = []; // On initialise un tableau vide pour les contacts

// Fonction pour charger les contacts de l'utilisateur connecté
async function chargerContacts() {
  try {
    // Récupérer l'utilisateur connecté depuis localStorage
    const utilisateurConnecte = JSON.parse(localStorage.getItem("utilisateurConnecte"));
    
    if (!utilisateurConnecte) return;

    // Récupérer tous les utilisateurs
    const response = await fetch(`${basse_url}/utilisateurs`);
    const utilisateurs = await response.json();

    // Filtrer pour avoir uniquement les contacts de l'utilisateur connecté
    contacts = utilisateurs.filter(user => 
      utilisateurConnecte.contact.includes(user.id)
    ).map(contact => ({
      id: contact.id,
      name: `${contact.prenom} ${contact.nom}`,
      phone: contact.telephone,
      message: "Salut ! J'utilise WhatsApp.",
      avatar: "/api/placeholder/40/40"
    }));

    // Ajouter l'utilisateur connecté en premier
    contacts.unshift({
      id: utilisateurConnecte.id,
      name: `${utilisateurConnecte.prenom} ${utilisateurConnecte.nom}`,
      status: "(vous)",
      message: "Envoyez-vous un message",
      avatar: "/api/placeholder/40/40",
      isYou: true
    });

    // Mettre à jour l'interface
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

function createContactItem(contact) {
  return createElement("div", {
    class: [
      "flex", "items-center", "px-4", "py-3", "hover:bg-gray-200", 
      "cursor-pointer", "transition-colors", "duration-150"
    ],
    onClick: () => {
      console.log(`Contact sélectionné: ${contact.name}`);
      toggleContactSelection();
    }
  }, [
    // Avatar
    createElement("div", {
      class: ["w-10", "h-10", "rounded-full", "bg-gray-300", "flex", "items-center", "justify-center", "mr-3"]
    }, [
      createElement("i", {
        class: ["fas", "fa-user", "text-black-300"]
      }, [])
    ]),
    
    createElement("div", {
      class: ["flex-1"]
    }, [
      createElement("div", {
        class: ["text-black-300", "font-medium", "text-sm"]
      }, [contact.name]),
      
      createElement("div", {
        class: ["text-gray-500", "text-xs", "mt-1"]
      }, [contact.message])
    ]),
    
    ...(contact.isYou ? [
      createElement("span", {
        class: ["text-gray-500", "text-xs", "ml-2"]
      }, [contact.status])
    ] : [])
  ]);
}

const entete1 = createElement("div", {
  id: "header",
  class: ["w-full", "h-16", "flex", "items-center", "justify-between", "px-4", "border-b", "border-gray-200"]
}, [
  createElement("h3", { class: ["text-xl", "font-semibold"] }, ["Discussions"]),
  createElement("div", { class: ["flex", "gap-2"] }, [
    createElement("div", {
      id: "contact-selection-container",
      class: ["relative"]
    }, [
      createElement("i", { 
        class: ["fa-solid", "fa-qrcode", "text-gray-600", "cursor-pointer", "p-2", "hover:bg-gray-100", "rounded"],
        onClick: toggleContactSelection
      }, []),
      
      createElement("div", {
        id: "contact-selection-popup",
        class: [
          "hidden", "fixed", "inset-0", "bg-gray-100", "z-50",
          "flex", "flex-col", "w-[35%]", "ml-[4%]"
        ]
      }, [
        createElement("div", {
          class: [
            "flex", "items-center", "px-4", "py-4", "bg-gray-100", 
            "border-b", "border-gray-300"
          ]
        }, [
          createElement("i", {
            class: ["fas", "fa-arrow-left", "text-black-300", "cursor-pointer", "mr-4"],
            onClick: toggleContactSelection
          }, []),
          
          createElement("h2", {
            class: ["text-black-300", "text-lg", "font-medium"]
          }, ["Nouvelle discussion"])
        ]),
        
        createElement("div", {
          class: ["px-4", "py-3", "bg-gray-100", "border-b", "border-gray-300"]
        }, [
          createElement("div", {
            class: ["flex", "items-center", "bg-gray-200", "rounded-lg", "px-3", "py-2"]
          }, [
            createElement("i", {
              class: ["fas", "fa-search", "text-black-300", "mr-3"]
            }, []),
            
            createElement("input", {
              type: "text",
              placeholder: "Rechercher un nom ou un numéro",
              class: [
                "bg-transparent", "text-black-300", "placeholder-gray-500", 
                "outline-none", "flex-1"
              ]
            }, [])
          ])
        ]),
        
        createElement("div", {
          class: ["bg-gray-100"]
        }, [
          // Nouveau contact
          createElement("div", {
            class: [
              "flex", "items-center", "px-4", "py-3", "hover:bg-gray-200", 
              "cursor-pointer", "transition-colors", "duration-150"
            ],
            onClick: handleNouveauContact
          }, [
            createElement("div", {
              class: [
                "w-10", "h-10", "rounded-full", "bg-teal-500", 
                "flex", "items-center", "justify-center", "mr-3"
              ]
            }, [
              createElement("i", {
                class: ["fas", "fa-user-plus", "text-white"]
              }, [])
            ]),
            
            createElement("span", {
              class: ["text-black-300", "font-medium"]
            }, ["Nouveau contact"])
          ]),
          
          // Nouvelle communauté
          createElement("div", {
            class: [
              "flex", "items-center", "px-4", "py-3", "hover:bg-gray-200", 
              "cursor-pointer", "transition-colors", "duration-150"
            ]
          }, [
            createElement("div", {
              class: [
                "w-10", "h-10", "rounded-full", "bg-teal-500", 
                "flex", "items-center", "justify-center", "mr-3"
              ]
            }, [
              createElement("i", {
                class: ["fas", "fa-users", "text-white"]
              }, [])
            ]),
            
            createElement("span", {
              class: ["text-black-300", "font-medium"]
            }, ["Nouvelle communauté"])
          ])
        ]),
        
        // Section contacts
        createElement("div", {
          class: ["flex-1", "overflow-y-auto"]
        }, [
          // Titre section
          createElement("div", {
            class: ["px-4", "py-2", "bg-gray-100", "border-b", "border-gray-300"]
          }, [
            createElement("h3", {
              class: ["text-black-300", "text-sm", "font-medium", "uppercase", "tracking-wide"]
            }, ["CONTACTS SUR WHATSAPP"])
          ]),
          
          // Liste des contacts avec vFor
          createElement("div", {
            id: "contact-list",
            class: ["flex-1", "overflow-y-auto"]
          }, []),
          
          // Séparateur pour les autres contacts
          createElement("div", {
            class: ["px-4", "py-2", "bg-gray-100"]
          }, [
            createElement("span", {
              class: ["text-black-300", "text-sm"]
            }, ["#"])
          ])
        ])
      ])
    ]),
    
    createElement("div", {
      id: "menu-container",
      class: ["relative"]
    }, [
      createElement("i", { 
        class: ["fa-solid", "fa-ellipsis-vertical", "text-gray-600", "cursor-pointer", "p-2", "hover:bg-gray-100", "rounded"],
        onClick: toggleMenu
      }, []),
      
      //  popup
      createElement("div", {
        id: "menu-popup",
        class: [
          "hidden", "absolute", "top-full", "right-0", "mt-2", "w-56", 
          "bg-gray-100", "rounded-lg", "shadow-xl", "z-50", "py-1",
          "border", "border-black-100"
        ]
      }, [
        createElement("div", {
          class: [
            "absolute", "-top-2", "right-4", "w-0", "h-0", 
            "border-l-8", "border-r-8", "border-b-8", 
            "border-l-transparent", "border-r-transparent", "border-b-gray-700"
          ]
        }, []),
        
        createElement("div", {
          class: [
            "px-4", "py-3", "text-black", "cursor-pointer", "flex", "items-center", 
            "hover:bg-gray-400", "transition-colors", "duration-150"
          ],
          onClick: () => {
            toggleMenu();
          }
        }, [
          createElement("i", {
            class: ["fas", "fa-users", "mr-3", "text-black-300", "w-4"]
          }, []),
          createElement("span", {}, ["Nouveau groupe"])
        ]),
        
        // Messages importants
        createElement("div", {
          class: [
            "px-4", "py-3", "text-black", "cursor-pointer", "flex", "items-center", 
            "hover:bg-gray-600", "transition-colors", "duration-150"
          ],
          onClick: () => {
            toggleMenu();
          }
        }, [
          createElement("i", {
            class: ["fas", "fa-star", "mr-3", "text-black-300", "w-4"]
          }, []),
          createElement("span", {}, ["Messages importants"])
        ]),
        
        createElement("div", {
          class: [
            "px-4", "py-3", "text-black", "cursor-pointer", "flex", "items-center", 
            "hover:bg-black-600", "transition-colors", "duration-150"
          ],
          onClick: () => {
            toggleMenu();
          }
        }, [
          createElement("i", {
            class: ["fas", "fa-check-square","hover:bg-gray-600", "mr-3", "text-black-300", "w-4"]
          }, []),
          createElement("span", {}, ["Sélectionner les discussions"])
        ]),
        
        createElement("div", {
          class: [
            "px-4", "py-3", "text-black", "cursor-pointer", "flex", "items-center", 
            "hover:bg-gray-600", "transition-colors", "duration-150"
          ],
          onClick: () => {
            toggleMenu();
          }
        }, [
          createElement("i", {
            class: ["fas", "fa-sign-out-alt", "mr-3", "text-black-300", "w-4"]
          }, []),
          createElement("span", {}, ["Déconnexion"])
        ])
      ])
    ])
  ])
]);

// Charger les contacts au démarrage
document.addEventListener('DOMContentLoaded', () => {
  chargerContacts();
});

// Modifier l'export pour inclure les nouvelles fonctions
export { entete1, chargerContacts };