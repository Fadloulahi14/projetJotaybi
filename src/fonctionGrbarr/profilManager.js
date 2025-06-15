import { createElement } from "../compenent.js";

class ProfilManager {
  constructor() {
    this.popupProfil = this.createProfilPopup();
    this.isOpen = false;
  }

  createProfilPopup() {
    const utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));

    return createElement("div", {
      id: "profil-popup",
      class: [
        "hidden", "fixed", "inset-0", "bg-white", "z-50",
        "flex", "flex-col", "w-[35%]", "ml-[4%]",
        "shadow-xl", "overflow-hidden"
      ]
    }, [
      // Header
      createElement("div", {
        class: [
          "flex", "items-center", "justify-between", "px-6", "py-4",
          "bg-white-100", "border-b", "border-gray-200"
        ]
      }, [
        createElement("div", {
          class: ["flex", "items-center", "gap-4"]
        }, [
          createElement("button", {
            class: [
              "p-2", "rounded-full", "hover:bg-gray-200",
              "transition-colors", "duration-200"
            ],
            onClick: () => this.toggleProfil()
          }, [
            createElement("i", {
              class: ["fas", "fa-arrow-left", "text-gray-600"]
            })
          ]),
          createElement("h2", {
            class: ["text-lg", "font-medium", "text-gray-800"]
          }, ["Profil"])
        ])
      ]),

      // Photo de profil
      createElement("div", {
        class: ["bg-gray-100", "p-6", "flex", "flex-col", "items-center"]
      }, [
        createElement("div", {
          class: ["w-40", "h-40", "rounded-full", "bg-gray-300", "mb-4"]
        }, [
          createElement("img", {
            src: utilisateur?.photo || "",
            class: ["w-full", "h-full", "rounded-full", "object-cover"]
          })
        ])
      ]),

      // Informations du profil
      createElement("div", {
        class: ["p-6", "space-y-6"]
      }, [
        // Nom
        createElement("div", {
          class: ["space-y-2"]
        }, [
          createElement("h3", {
            class: ["text-sm", "font-medium", "text-green-600"]
          }, ["Votre nom"]),
          createElement("div", {
            class: ["flex", "justify-between", "items-center"]
          }, [
            createElement("p", {
              class: ["text-gray-900"]
            }, [`${utilisateur?.prenom || ''} ${utilisateur?.nom || ''}`]),
            createElement("button", {
              class: ["text-gray-400"]
            }, [
              createElement("i", {
                class: ["fas", "fa-pen"]
              })
            ])
          ]),
          createElement("p", {
            class: ["text-sm", "text-gray-500"]
          }, ["Il ne s'agit pas de votre nom d'utilisateur ou code PIN. Ce nom sera visible par vos contacts WhatsApp."])
        ]),

        // À propos
        createElement("div", {
          class: ["space-y-2"]
        }, [
          createElement("h3", {
            class: ["text-sm", "font-medium", "text-green-600"]
          }, ["Infos"]),
          createElement("div", {
            class: ["flex", "justify-between", "items-center"]
          }, [
            createElement("p", {
              class: ["text-gray-900"]
            }, ["Salut ! J'utilise WhatsApp."]),
            createElement("button", {
              class: ["text-gray-400"]
            }, [
              createElement("i", {
                class: ["fas", "fa-pen"]
              })
            ])
          ])
        ]),

        // Téléphone
        createElement("div", {
          class: ["space-y-2"]
        }, [
          createElement("h3", {
            class: ["text-sm", "font-medium", "text-green-600"]
          }, ["Téléphone"]),
          createElement("p", {
            class: ["text-gray-900"]
          }, [utilisateur?.telephone || ''])
        ])
      ])
    ]);
  }

  toggleProfil() {
    const popup = document.querySelector('#profil-popup');
    if (popup) {
      if (this.isOpen) {
        popup.classList.add('hidden');
        popup.classList.remove('block');
      } else {
        popup.classList.remove('hidden');
        popup.classList.add('block');
      }
      this.isOpen = !this.isOpen;
    }
  }

  init() {
    document.body.appendChild(this.popupProfil);
    
    // Fermer le popup si on clique en dehors
    document.addEventListener('click', (e) => {
      const popup = document.querySelector('#profil-popup');
      if (popup && this.isOpen && !popup.contains(e.target) && 
          !e.target.closest('#profile-photo')) {
        this.toggleProfil();
      }
    });
  }
}

const profilManager = new ProfilManager();
export { profilManager };