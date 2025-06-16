import { createElement } from "../compenent.js";
import { basse_url } from "../validateur/fonctionValidate.js";

class GroupeManager {
  constructor() {
    this.selectedContacts = [];
    this.popupGroupe = this.createGroupePopup();
    this.isOpen = false;
    this.step = 1; // 1: Sélection contacts, 2: Configuration groupe
  }

  async loadContacts() {
    try {
      const moi = JSON.parse(localStorage.getItem("utilisateurConnecte"));
      const response = await fetch(`${basse_url}/utilisateurs`);
      const utilisateurs = await response.json();
      
      // Retourner uniquement les contacts de l'utilisateur connecté
      return utilisateurs.filter(u => moi.contact.includes(u.id));
    } catch (error) {
      console.error("Erreur chargement contacts:", error);
      return [];
    }
  }

  createGroupePopup() {
    return createElement("div", {
      id: "groupe-popup",
      class: [
        "hidden", "fixed", "inset-0", "bg-white", "z-50",
        "flex", "flex-col", "w-[35%]", "ml-[4%]",
        "shadow-xl", "overflow-hidden"
      ]
    }, [
      // Header étape 1
      createElement("div", {
        id: "step-1-header",
        class: ["flex", "items-center", "px-6", "py-4", "bg-white", "border-b", "border-gray-200"]
      }, [
        createElement("button", {
          class: ["mr-4"],
          onClick: () => this.toggleGroupe()
        }, [
          createElement("i", {
            class: ["fas", "fa-arrow-left", "text-gray-600"]
          })
        ]),
        createElement("h2", {
          class: ["text-xl", "font-medium"]
        }, ["Nouveau groupe"]),
        createElement("button", {
          class: ["ml-auto", "px-4", "py-2", "bg-green-500", "text-white", "rounded-lg", "disabled:opacity-50"],
          id: "next-step-btn",
          disabled: true,
          onClick: () => this.goToStep2()
        }, ["Suivant"])
      ]),

      // Header étape 2 (caché par défaut)
      createElement("div", {
        id: "step-2-header",
        class: ["hidden", "flex", "items-center", "px-6", "py-4", "bg-white", "border-b", "border-gray-200"]
      }, [
        createElement("button", {
          class: ["mr-4"],
          onClick: () => this.backToStep1()
        }, [
          createElement("i", {
            class: ["fas", "fa-arrow-left", "text-gray-600"]
          })
        ]),
        createElement("h2", {
          class: ["text-xl", "font-medium"]
        }, ["Info du groupe"])
      ]),

      // Contenu étape 1
      createElement("div", {
        id: "step-1-content",
        class: ["flex-1", "overflow-y-auto"]
      }, [
        // Zone de recherche
        createElement("div", {
          class: ["p-4", "border-b", "border-gray-200"]
        }, [
          createElement("input", {
            type: "text",
            placeholder: "Rechercher des contacts",
            class: [
              "w-full", "px-4", "py-2", "rounded-lg",
              "border", "border-gray-300", "focus:outline-none",
              "focus:border-green-500"
            ]
          })
        ]),
        // Liste des contacts
        createElement("div", {
          id: "contacts-list",
          class: ["flex-1"]
        })
      ]),

      // Contenu étape 2 (caché par défaut)
      createElement("div", {
        id: "step-2-content",
        class: ["hidden", "flex-1", "overflow-y-auto", "p-4", "space-y-4"]
      }, [
        createElement("div", {
          class: ["flex", "items-center", "space-x-4"]
        }, [
          createElement("div", {
            class: ["w-20", "h-20", "rounded-full", "bg-gray-200", "flex", "items-center", "justify-center"]
          }, [
            createElement("i", {
              class: ["fas", "fa-camera", "text-gray-400", "text-xl"]
            })
          ]),
          createElement("input", {
            type: "text",
            id: "groupe-name",
            placeholder: "Nom du groupe",
            class: [
              "flex-1", "px-4", "py-2", "border-b", "border-green-500",
              "focus:outline-none", "text-xl"
            ]
          })
        ]),
        createElement("input", {
          type: "text",
          placeholder: "Sujet du groupe (facultatif)",
          class: [
            "w-full", "px-4", "py-2", "border-b", "border-gray-300",
            "focus:outline-none", "focus:border-green-500"
          ]
        }),
        createElement("div", {
          class: ["flex", "items-center", "justify-between", "p-4", "bg-gray-50", "rounded-lg"]
        }, [
          createElement("span", {
            class: ["text-gray-600"]
          }, ["Messages éphémères"]),
          createElement("span", {
            class: ["text-gray-400"]
          }, ["Non"])
        ]),
        createElement("button", {
          class: [
            "w-full", "mt-4", "px-4", "py-2", "bg-green-500",
            "text-white", "rounded-lg", "disabled:opacity-50"
          ],
          onClick: () => this.createGroup()
        }, ["Créer le groupe"])
      ])
    ]);
  }

  async renderContacts() {
    const contactsList = this.popupGroupe.querySelector("#contacts-list");
    const contacts = await this.loadContacts();
    
    contactsList.innerHTML = "";

    // Ajouter une section des contacts sélectionnés en haut
    if (this.selectedContacts.length > 0) {
      const selectedSection = createElement("div", {
        class: ["p-4", "border-b", "border-gray-200", "bg-gray-50"]
      }, [
        createElement("div", {
          class: ["flex", "flex-wrap", "gap-2"]
        }, 
        this.selectedContacts.map(contact => 
          createElement("div", {
            class: [
              "flex", "items-center", "gap-2", "bg-green-100", 
              "px-3", "py-1", "rounded-full"
            ]
          }, [
            createElement("span", {
              class: ["text-sm", "text-green-800"]
            }, [`${contact.prenom} ${contact.nom}`]),
            createElement("button", {
              class: ["text-green-600", "hover:text-green-800"],
              onClick: () => this.toggleContactSelection(contact)
            }, [
              createElement("i", {
                class: ["fas", "fa-times", "text-xs"]
              })
            ])
          ])
        ))
      ]);
      contactsList.appendChild(selectedSection);
    }

    // Liste des contacts disponibles
    if (contacts.length === 0) {
      contactsList.appendChild(
        createElement("div", {
          class: ["p-4", "text-center", "text-gray-500"]
        }, ["Aucun contact disponible"])
      );
      return;
    }

    const contactsContainer = createElement("div", {
      class: ["divide-y", "divide-gray-200"]
    });

    contacts.forEach(contact => {
      const isSelected = this.selectedContacts.some(c => c.id === contact.id);
      const contactElement = createElement("div", {
        class: [
          "flex", "items-center", "px-4", "py-3",
          "hover:bg-gray-50", "cursor-pointer",
          isSelected ? "bg-gray-50" : ""
        ],
        onClick: () => this.toggleContactSelection(contact)
      }, [
        createElement("div", {
          class: ["w-10", "h-10", "rounded-full", "bg-gray-200", "mr-3", 
                  "flex", "items-center", "justify-center"]
        }, [
          createElement("i", {
            class: ["fas", "fa-user", "text-gray-400"]
          })
        ]),
        createElement("div", {
          class: ["flex-1"]
        }, [
          createElement("h3", {
            class: ["font-medium", "text-gray-900"]
          }, [`${contact.prenom} ${contact.nom}`]),
          createElement("p", {
            class: ["text-sm", "text-gray-500"]
          }, [contact.telephone])
        ]),
        createElement("div", {
          class: [
            "w-6", "h-6", "rounded-full", "border", 
            "flex", "items-center", "justify-center",
            isSelected ? "bg-green-500 border-green-500" : "border-gray-300"
          ]
        }, [
          isSelected && createElement("i", {
            class: ["fas", "fa-check", "text-white", "text-sm"]
          })
        ])
      ]);
      contactsContainer.appendChild(contactElement);
    });

    contactsList.appendChild(contactsContainer);
    
    // Mettre à jour le bouton Suivant
    const nextButton = this.popupGroupe.querySelector("#next-step-btn");
    nextButton.disabled = this.selectedContacts.length === 0;
  }

  toggleContactSelection(contact) {
    const index = this.selectedContacts.findIndex(c => c.id === contact.id);
    
    if (index === -1) {
      this.selectedContacts.push(contact);
    } else {
      this.selectedContacts.splice(index, 1);
    }

    // Rafraîchir l'affichage des contacts
    this.renderContacts();
  }

  goToStep2() {
    this.step = 2;
    this.popupGroupe.querySelector("#step-1-header").classList.add("hidden");
    this.popupGroupe.querySelector("#step-1-content").classList.add("hidden");
    this.popupGroupe.querySelector("#step-2-header").classList.remove("hidden");
    this.popupGroupe.querySelector("#step-2-content").classList.remove("hidden");
  }

  backToStep1() {
    this.step = 1;
    this.popupGroupe.querySelector("#step-2-header").classList.add("hidden");
    this.popupGroupe.querySelector("#step-2-content").classList.add("hidden");
    this.popupGroupe.querySelector("#step-1-header").classList.remove("hidden");
    this.popupGroupe.querySelector("#step-1-content").classList.remove("hidden");
  }

  async createGroup() {
    const groupName = this.popupGroupe.querySelector("#groupe-name").value.trim();
    if (!groupName) return;

    const moi = JSON.parse(localStorage.getItem("utilisateurConnecte"));
    const members = this.selectedContacts.map(c => c.id);
    members.push(moi.id);

    try {
      const response = await fetch(`${basse_url}/groupes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nom: groupName,
          admin: moi.id,
          membres: members,
          messages: [],
          dateCreation: new Date().toISOString()
        })
      });

      if (response.ok) {
        this.toggleGroupe();
        // Rafraîchir la liste des conversations
        window.dispatchEvent(new CustomEvent('groupeCreated'));
      }
    } catch (error) {
      console.error("Erreur création groupe:", error);
    }
  }

  toggleGroupe() {
    const popup = document.querySelector('#groupe-popup');
    if (popup) {
      if (this.isOpen) {
        popup.classList.add('hidden');
        popup.classList.remove('block');
      } else {
        popup.classList.remove('hidden');
        popup.classList.add('block');
        this.renderContacts();
      }
      this.isOpen = !this.isOpen;
    }
  }

  init() {
    document.body.appendChild(this.popupGroupe);
  }
}

const groupeManager = new GroupeManager();
export { groupeManager };