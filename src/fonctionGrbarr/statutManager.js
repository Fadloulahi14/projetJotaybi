import { createElement } from "../compenent.js";

class StatutManager {
  constructor() {
    this.popupStatut = this.createStatutPopup();
    this.isOpen = false;
  }

  createStatutPopup() {
    return createElement("div", {
      id: "statut-popup",
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
            onClick: () => this.toggleStatut()
          }, [
            createElement("i", {
              class: ["fas", "fa-arrow-left", "text-gray-600"]
            })
          ]),
          createElement("h2", {
            class: ["text-lg", "font-medium", "text-gray-800"]
          }, ["Statut"])
        ]),
        createElement("button", {
          class: ["text-gray-600", "hover:text-gray-800"],
          onClick: () => this.toggleStatut()
        }, [
          createElement("i", {
            class: ["fas", "fa-ellipsis-v"]
          })
        ])
      ]),

      // Mon statut
      createElement("div", {
        class: ["p-4", "border-b", "border-gray-200"]
      }, [
        createElement("div", {
          class: ["flex", "items-center", "gap-4"]
        }, [
          createElement("div", {
            class: [
              "w-12", "h-12", "rounded-full", "bg-green-100",
              "flex", "items-center", "justify-center"
            ]
          }, [
            createElement("i", {
              class: ["fas", "fa-plus", "text-green-600"]
            })
          ]),
          createElement("div", {
            class: ["flex-1"]
          }, [
            createElement("h3", {
              class: ["font-medium", "text-gray-900"]
            }, ["Mon statut"]),
            createElement("p", {
              class: ["text-sm", "text-gray-500"]
            }, ["Cliquez pour ajouter un statut"])
          ])
        ])
      ]),

      // Statuts récents
      createElement("div", {
        class: ["flex-1", "overflow-y-auto"]
      }, [
        createElement("div", {
          class: ["px-6", "py-3", "text-sm", "font-medium", "text-gray-500"]
        }, ["RÉCENTS"]),
        
        // Liste des statuts récents
        this.createRecentStatutsList([
          { name: "khouss", time: "Aujourd'hui à 22:54" },
          { name: "Lamine Bara", time: "Aujourd'hui à 22:52" },
          { name: "bamba", time: "Aujourd'hui à 22:52" },
          { name: "abdoulaye", time: "Aujourd'hui à 22:52" },
          { name: "Ounmane", time: "Aujourd'hui à 22:50" },
          { name: "Thierno", time: "Aujourd'hui à 22:47" },
          { name: "Pape sidy", time: "Aujourd'hui à 22:47" }
        ])
      ])
    ]);
  }

  createRecentStatutsList(statuts) {
    return createElement("div", {
      class: ["space-y-4"]
    }, 
    statuts.map(statut => 
      createElement("div", {
        class: [
          "flex", "items-center", "gap-4", "px-6", "py-2",
          "hover:bg-gray-50", "cursor-pointer"
        ]
      }, [
        createElement("div", {
          class: ["w-12", "h-12", "rounded-full", "bg-gray-200"]
        }),
        createElement("div", {
          class: ["flex-1"]
        }, [
          createElement("h3", {
            class: ["font-medium", "text-gray-900"]
          }, [statut.name]),
          createElement("p", {
            class: ["text-sm", "text-gray-500"]
          }, [statut.time])
        ])
      ])
    ));
  }

  toggleStatut() {
    const popup = document.querySelector('#statut-popup');
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
    document.body.appendChild(this.popupStatut);
    
    // Fermer le popup si on clique en dehors
    document.addEventListener('click', (e) => {
      const popup = document.querySelector('#statut-popup');
      if (popup && this.isOpen && !popup.contains(e.target) && 
          !e.target.closest('.bx-circle-outer-dashed-circle')) {
        this.toggleStatut();
      }
    });
  }
}

const statutManager = new StatutManager();
export { statutManager };