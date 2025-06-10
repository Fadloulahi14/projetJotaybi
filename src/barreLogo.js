
import "./style.css";
import { createElement } from "./compenent.js";
// import { messagesConversation, conversations} from "./consts.js";
import { AjouterContact, afficherContacts, afficherInterfaceGroupes, toggleAffichage} from "./mesFunction.js"


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

const iconeEtphoto = createElement('div',{class: ["w-[100%]", "h-[20%]",  "flex", "justify-center", "items-center", "cursor-pointer", 'gap-[10px]', ]}, [
    createElement("div", {class:[ "flex", "justify-center", "items-center", "border-gray-300", "cursor-pointer", 'gap-[10px]', 'flex-col', 'flex-end']}, [
        createElement('div', {class: ["w-[50px]", "h-[50px]", "rounded-full", "flex", "justify-center", "items-center",  "cursor-pointer"]},[
            createElement("i", {class: ["fa-solid", "fa-gear"]}, [])
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


export{barLogo, } 
