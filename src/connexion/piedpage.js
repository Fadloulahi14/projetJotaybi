import { createElement } from "../compenent";

const footer = createElement('div', {
  class: ['mt-8', 'text-center', 'text-sm', 'text-gray-600']
}, [
  createElement('p', {}, [
    'En vous connectant, vous acceptez nos ',
    createElement('a', {
      href: '#',
      class: ['text-green-500', 'hover:text-green-600', 'underline']
    }, ['Conditions d\'utilisation']),
    ' et notre ',
    createElement('a', {
      href: '#',
      class: ['text-green-500', 'hover:text-green-600', 'underline']
    }, ['Politique de confidentialité'])
  ])
]);

export{footer}