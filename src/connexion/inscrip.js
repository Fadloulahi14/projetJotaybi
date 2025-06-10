import { createElement } from "../compenent";

const formulaireInscription = createElement('form', {
  class: ['space-y-6', 'w-full', ],
  id: "inscription"

}, [
 
  createElement('div', { class: ['space-y-2'] }, [
    createElement('label', {
      class: ['block', 'text-sm', 'font-medium', 'text-gray-700']
    }, ['Nom']),
    createElement('input', {
      type: 'text',
      placeholder: 'Votre nom',
      class: [
        'w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg',
        'focus:ring-2', 'focus:ring-green-500', 'focus:border-transparent',
        'outline-none', 'text-gray-900', 'placeholder-gray-500'
      ]
    })
  ]),
  

  createElement('div', { class: ['space-y-2'] }, [
    createElement('label', {
      class: ['block', 'text-sm', 'font-medium', 'text-gray-700']
    }, ['Prénom']),
    createElement('input', {
      type: 'text',
      placeholder: 'Votre prénom',
      class: [
        'w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg',
        'focus:ring-2', 'focus:ring-green-500', 'focus:border-transparent',
        'outline-none', 'text-gray-900', 'placeholder-gray-500'
      ]
    })
  ]),
  
  
  createElement('div', { class: ['space-y-2'] }, [
    createElement('label', {
      class: ['block', 'text-sm', 'font-medium', 'text-gray-700']
    }, ['Numéro de téléphone']),
    createElement('input', {
      type: 'tel',
      placeholder: '+221 XX XXX XX XX',
      class: [
        'w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg',
        'focus:ring-2', 'focus:ring-green-500', 'focus:border-transparent',
        'outline-none', 'text-gray-900', 'placeholder-gray-500'
      ]
    })
  ]),
  
 
  createElement('div', { class: ['space-y-2'] }, [
    createElement('label', {
      class: ['block', 'text-sm', 'font-medium', 'text-gray-700']
    }, ['Mot de passe']),
    createElement('input', {
      type: 'password',
      placeholder: 'Votre mot de passe',
      class: [
        'w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg',
        'focus:ring-2', 'focus:ring-green-500', 'focus:border-transparent',
        'outline-none', 'text-gray-900', 'placeholder-gray-500'
      ]
    })
  ]),
  
  createElement('button', {
    type: 'submit',
    class: [
      'w-full', 'bg-green-500', 'hover:bg-green-600', 'text-white',
      'font-semibold', 'py-3', 'px-4', 'rounded-lg', 'transition-colors',
      'duration-200', 'focus:outline-none', 'focus:ring-2',
      'focus:ring-green-500', 'focus:ring-offset-2'
    ]
  }, ['S\'inscrire'])
]);

export{formulaireInscription}