import { createElement } from "../compenent";
import {affichage, affichageconnexion} from "../main.js";



const navigationTabs = createElement('div', {
  class: ['flex', 'bg-gray-100', 'rounded-lg', 'p-1', 'mb-6']
}, [
  createElement('button', {
    class: [
      'flex-1', 'py-2', 'px-4', 'rounded-md', 'text-sm', 'font-medium',
      'bg-white', 'text-gray-900', 'shadow-sm'
    ],
    onclick: () => {
      affichageconnexion()
    }


  }, ['Connexion']),
  createElement('button', {
    class: [
      'flex-1', 'py-2', 'px-4', 'rounded-md', 'text-sm', 'font-medium',
      'text-gray-600', 'hover:text-gray-900'
    ], 
    onclick: () => {
      affichage()
    }
  }, ['Inscription'])
]);

export {navigationTabs}

