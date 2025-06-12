import "./style.css";
import { createElement } from "./compenent.js";
import { AjouterContact, afficherContacts, afficherInterfaceGroupes, toggleAffichage} from "./mesFunction.js"

// Récupérer l'utilisateur connecté
const utilisateurTrouver = JSON.parse(localStorage.getItem("utilisateurConnecte")) || {
  prenom: "",
  nom: "",
  telephone: ""
};

const iconeComple = [
  "w-[90%]",
  // "h-[10%]",
//   "border",
    "mt-[10%]",
  // "border-[#e7d39f]",
  "text-black-400",
  "flex",
  "flex-col",
  "justify-center",
  "items-center",
//   "rounded-[10px]",
  "cursor-pointer",
  "hover:green-900",
  "text-[16px]",
];

const quatreIcon = createElement(
  "div",
  {
    class: [
      "contentLOgo",
      "w-full",
      "h-[50%]",
      "flex",
      "flex-col",
      "items-center",
      
      "mt-[15%]",
      "gap-[2%]",
      "text-[25px]",
      "text-black",
    ],
    id: "contentLOgo",
  },
  [
    createElement(
      "button",
      {
        class: iconeComple,
      },
      [
        createElement(
          "i",
          {
            class: ["fa-solid", "fa-message"],
          },
          []
        ),
        createElement(
          "p",
          {
            class: ["text-[10px]"]
          },
          []
        ),
      ]
    ),

       createElement("button", {
      class: iconeComple,
      onclick: () => {
        toggleAffichage("listContact");
        afficherContacts()
      }
    }, [
      createElement("i", { class: ['bxr' , 'bx-circle-outer-dashed-circle'] }, []),
      createElement("p", { }, []),
    ]),

  

    createElement("button", { 
      class: iconeComple, 
      onclick: AjouterContact 
    }, [
      createElement("i", { class: ["fa-solid", " fa-comment"] }, []),
      createElement("p", {}, []),
    ]),

      createElement("button", { 
      class: iconeComple, 
      onclick: afficherInterfaceGroupes
    }, [
      createElement("i", { class: ["fa-solid", "fa-users"] }, []),
      createElement("p", {  }, []),
    ]), 

    

    
  ]
);

const iconeEtphoto = createElement('div',{
    class: ["w-[100%]", "h-[20%]", "flex", "justify-center", "items-center", "cursor-pointer", 'gap-[10px]']
}, [
    createElement("div", {
        class:[ "flex", "justify-center", "items-center", "border-gray-300", "cursor-pointer", 'gap-[10px]', 'flex-col', 'flex-end']
    }, [
        // Ajouter l'ID et l'événement onClick directement ici
        createElement('div', {
            id: "gear-icon",
            class: ["w-[50px]", "h-[50px]", "rounded-full", "flex", "justify-center", "items-center", "cursor-pointer"],
            onClick: toggleParametres
        },[
            createElement("i", {
                class: ["fa-solid", "fa-gear"]
            }, [])
        ]),
        createElement("div", {
            class: ["w-[50px]", "h-[50px]", "rounded-full", "flex", "justify-center", "items-center", "border", "border-white-500", "cursor-pointer"]
        }, [
            createElement("img", {
                src: "",
                class: ["w-[100%]", "h-[100%]", "rounded-full"]
            })
        ])
    ])
])

const barLogo = createElement(
  "div",
  {
    id: "bare1",
    class: ['w-[4%]', "h-full", "bg-[#f0f2f5]", 'flex', 'justify-center', 'items-center', 'flex-col', 'justify-between']
  },
  [quatreIcon,iconeEtphoto]
);


// Ajoutez le popup des paramètres
const popupParametres = createElement("div", {
  id: "parametres-popup",
  class: [
    "hidden", "fixed", "inset-0", "bg-white", "z-50",
    "flex", "flex-col", "w-[35%]", "ml-[4%]",
    "shadow-xl",  "overflow-hidden"
  ]
}, [
  // En-tête
  createElement("div", {
    class: [
      "flex", "items-center", "px-6", "py-4", 
      "bg-white-100", "border-b", "border-gray-200"
    ]
  }, [
    createElement("button", {
      class: [
        "p-2", "rounded-full", "hover:bg-gray-200",
        "transition-colors", "duration-200"
      ],
      onClick: toggleParametres
    }, [
      createElement("i", {
        class: ["fas", "fa-arrow-left", "text-gray-600"]
      })
    ]),
    createElement("h2", {
      class: ["text-lg", "font-medium", "ml-4", "text-gray-800"]
    }, ["Paramètres"])
  ]),

  // Profil utilisateur
  createElement("div", {
    class: ["p-6", "border-b", "border-gray-200"]
  }, [
    createElement("div", {
      class: ["flex", "items-center", "space-x-4"]
    }, [
      createElement("div", {
        class: [
          "w-16", "h-16", "rounded-full", 
          "bg-gray-300", "flex", "items-center", 
          "justify-center"
        ]
      }, [
        createElement("i", {
          class: ["fas", "fa-user", "text-gray-600", "text-2xl"]
        })
      ]),
      createElement("div", {
        class: ["flex-1"]
      }, [
        createElement("h3", {
          class: ["font-medium", "text-gray-900"]
        }, [utilisateurTrouver.prenom + " " + utilisateurTrouver.nom]),
        createElement("p", {
          class: ["text-gray-500", "text-sm"]
        }, [utilisateurTrouver.telephone])
      ])
    ])
  ]),


  // Liste des options
  createElement("div", {
    class: ["flex-1", "overflow-y-auto"]
  }, [
    // Notifications
    createElement("button", {
      class: [
        "w-full", "px-6", "py-4", "flex", "items-center",
        "hover:bg-gray-50", "transition-colors", "duration-150"
      ]
    }, [
      createElement("div", {
        class: [
          "w-10", "h-10", "rounded-full", "bg-blue-100",
          "flex", "items-center", "justify-center", "mr-4"
        ]
      }, [
        createElement("i", {
          class: ["fas", "fa-bell", "text-blue-600"]
        })
      ]),
      createElement("span", {
        class: ["text-gray-700"]
      }, ["Notifications"])
    ]),

    // Confidentialité
    createElement("button", {
      class: [
        "w-full", "px-6", "py-4", "flex", "items-center",
        "hover:bg-gray-50", "transition-colors", "duration-150"
      ]
    }, [
      createElement("div", {
        class: [
          "w-10", "h-10", "rounded-full", "bg-green-100",
          "flex", "items-center", "justify-center", "mr-4"
        ]
      }, [
        createElement("i", {
          class: ["fas", "fa-lock", "text-green-600"]
        })
      ]),
      createElement("span", {
        class: ["text-gray-700"]
      }, ["Confidentialité"])
    ]),

    // Déconnexion
    createElement("button", {
      class: [
        "w-full", "px-6", "py-4", "flex", "items-center",
        "hover:bg-gray-50", "transition-colors", "duration-150"
      ],
      onClick: () => {
        localStorage.removeItem("utilisateurConnecte");
        window.location.reload();
      }
    }, [
      createElement("div", {
        class: [
          "w-10", "h-10", "rounded-full", "bg-red-100",
          "flex", "items-center", "justify-center", "mr-4"
        ]
      }, [
        createElement("i", {
          class: ["fas", "fa-sign-out-alt", "text-red-600"]
        })
      ]),
      createElement("span", {
        class: ["text-gray-700"]
      }, ["Déconnexion"])
    ])
  ])
])

let isParametresOpen = false;

function toggleParametres() {
  const popup = document.querySelector('#parametres-popup');
  if (popup) {
    if (isParametresOpen) {
      popup.classList.add('hidden');
      popup.classList.remove('block');
      isParametresOpen = false;
    } else {
      popup.classList.remove('hidden');
      popup.classList.add('block');
      isParametresOpen = true;
    }
  }
}

// Fermer le popup si on clique en dehors
document.addEventListener('click', function(e) {
    const popup = document.querySelector('#parametres-popup');
    const gearIcon = document.querySelector('#gear-icon');
    
    if (popup && isParametresOpen) {
        // Vérifier si le clic est en dehors du popup ET en dehors de l'icône
        if (!popup.contains(e.target) && (!gearIcon || !gearIcon.contains(e.target))) {
            popup.classList.add('hidden');
            popup.classList.remove('block');
            isParametresOpen = false;
        }
    }
});
export { barLogo, popupParametres };
