// import "./style.css";
import { createElement } from "../compenent.js";
import { header } from "./tete.js";
import { navigationTabs } from "./navig.js";
import { formulaireInscription } from "./inscrip.js";
import { formulaireConnexion } from "./seConnter.js";
import { footer } from "./piedpage.js";

const mainContainer = createElement('div', {
  class: [
    'w-full', 'h-full', 'bg-grey-100', 'from-green-50', 'to-blue-50',
    'flex', 'items-center', 'justify-center', 'px-4', 'py-8', 
  ]
}, [
  createElement('div', {
    class: [
      'bg-white', 'rounded-2xl', 'shadow-xl', 'p-8', 'w-full', 'max-w-md',
      'border', 'border-gray-100'
    ]
  }, [
    header,
    navigationTabs,
    formulaireConnexion,
    formulaireInscription,
    // footer
  ])
]);



export{mainContainer}
