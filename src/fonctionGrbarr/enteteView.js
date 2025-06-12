import { createElement } from "../compenent";
import { toggleMenu, toggleContactSelection } from "./enteteController";

const entete1 = createElement("div", {
  id: "header",
  class: [
    "w-full", "h-16", "flex", "items-center", "justify-between", 
    "px-6", "bg-white", "shadow-sm", "border-b", "border-gray-100"
  ]
}, [
 
  createElement("h3", { 
    class: ["text-xl", "font-semibold", "text-gray-800", "tracking-wide"] 
  }, ["Discussions"]),


  createElement("div", { 
    class: ["flex", "gap-4", "items-center"] 
  }, [
   
    createElement("div", {
      id: "contact-selection-container",
      class: ["relative"]
    }, [
     
      createElement("button", { 
        class: [
          "p-2", "rounded-full", "hover:bg-gray-100",
          "transition-all", "duration-200", "ease-in-out"
        ],
        onClick: toggleContactSelection
      }, [
        createElement("i", { 
          class: ["fa-solid", "fa-qrcode", "text-gray-600", "text-lg"] 
        }, [])
      ]),
      
   
      createElement("div", {
        id: "contact-selection-popup",
        class: [
          "hidden", "fixed", "inset-0", "bg-white", "z-50",
          "flex", "flex-col", "w-[400px]", "ml-[4%]",
          "shadow-xl", "rounded-lg", "overflow-hidden"
        ]
      }, [
        createElement("div", {
          class: [
            "flex", "items-center", "px-6", "py-4", 
            "bg-teal-600", "text-white"
          ]
        }, [
          createElement("button", {
            class: [
              "p-2", "rounded-full", "hover:bg-teal-500",
              "transition-colors", "duration-200"
            ],
            onClick: toggleContactSelection
          }, [
            createElement("i", {
              class: ["fas", "fa-arrow-left"]
            }, [])
          ]),
          
          createElement("h2", {
            class: ["text-lg", "font-medium", "ml-4"]
          }, ["Nouvelle discussion"])
        ]),
        
        createElement("div", {
          class: ["px-4", "py-3", "bg-white", "border-b"]
        }, [
          createElement("div", {
            class: [
              "flex", "items-center", "bg-gray-50", "rounded-full",
              "px-4", "py-2", "focus-within:ring-2", "focus-within:ring-teal-500"
            ]
          }, [
            createElement("i", {
              class: ["fas", "fa-search", "text-gray-400"]
            }, []),
            
            createElement("input", {
              type: "text",
              placeholder: "Rechercher un contact",
              class: [
                "ml-3", "bg-transparent", "w-full",
                "focus:outline-none", "text-gray-600"
              ]
            }, [])
          ])
        ]),
        
        createElement("div", {
          class: ["bg-white", "py-2"]
        }, [
          createElement("button", {
            class: [
              "flex", "items-center", "w-full", "px-6", "py-3",
              "hover:bg-gray-50", "transition-colors", "duration-150"
            ]
          }, [
            createElement("div", {
              class: [
                "w-12", "h-12", "rounded-full", "bg-teal-500",
                "flex", "items-center", "justify-center"
              ]
            }, [
              createElement("i", {
                class: ["fas", "fa-user-plus", "text-white", "text-lg"]
              }, [])
            ]),
            
            createElement("span", {
              class: ["ml-4", "text-gray-700", "font-medium"]
            }, ["Nouveau contact"])
          ]),
          
          createElement("button", {
            class: [
              "flex", "items-center", "w-full", "px-6", "py-3",
              "hover:bg-gray-50", "transition-colors", "duration-150"
            ]
          }, [
            createElement("div", {
              class: [
                "w-12", "h-12", "rounded-full", "bg-teal-500",
                "flex", "items-center", "justify-center"
              ]
            }, [
              createElement("i", {
                class: ["fas", "fa-users", "text-white", "text-lg"]
              }, [])
            ]),
            
            createElement("span", {
              class: ["ml-4", "text-gray-700", "font-medium"]
            }, ["Nouvelle communauté"])
          ])
        ]),
        
        createElement("div", {
          class: ["flex-1", "overflow-y-auto"]
        }, [
          createElement("div", {
            class: ["px-6", "py-3", "bg-gray-50"]
          }, [
            createElement("h3", {
              class: ["text-sm", "font-medium", "text-gray-500", "uppercase"]
            }, ["Contacts sur WhatsApp"])
          ]),
          
          createElement("div", {
            id: "contact-list",
            class: ["divide-y", "divide-gray-100"]
          }, [])
        ])
      ])
    ]),
    
    createElement("div", {
      id: "menu-container",
      class: ["relative"]
    }, [
      createElement("button", { 
        class: [
          "p-2", "rounded-full", "hover:bg-gray-100",
          "transition-all", "duration-200", "ease-in-out"
        ],
        onClick: toggleMenu
      }, [
        createElement("i", { 
          class: ["fa-solid", "fa-ellipsis-vertical", "text-gray-600", "text-lg"]
        }, [])
      ]),
      
      createElement("div", {
        id: "menu-popup",
        class: [
          "hidden", "absolute", "top-full", "right-0", "mt-2",
          "w-64", "bg-white", "rounded-lg", "shadow-xl", "z-50",
          "border", "border-gray-100", "py-1", "overflow-hidden"
        ]
      }, [
        createElement("button", {
          class: [
            "flex", "items-center", "w-full", "px-4", "py-3",
            "hover:bg-gray-50", "transition-colors", "duration-150"
          ],
          onClick: toggleMenu
        }, [
          createElement("i", {
            class: ["fas", "fa-users", "text-gray-500", "w-5"]
          }, []),
          createElement("span", {
            class: ["ml-3", "text-gray-700"]
          }, ["Nouveau groupe"])
        ]),
        
      ])
    ])
  ])
]);

export { entete1 };