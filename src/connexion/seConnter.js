import { createElement } from "../compenent";
import {conteneur} from "../main.js";


const formulaireConnexion = createElement('form', {
  class: ['space-y-6', 'w-full'], 
  id:"connexion"
}, [
  
  createElement('div', { class: ['space-y-2'] }, [
    createElement('label', {
      class: ['block', 'text-sm', 'font-medium', 'text-gray-700']
    }, ['Numéro de téléphone']),
    createElement('input', {
      type: 'tel',
      placeholder: '+221 XX XXX XX XX',
      id: 'inputnum',
      class: [
        'w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg',
        'focus:ring-2', 'focus:ring-green-500', 'focus:border-transparent',
        'outline-none', 'text-gray-900', 'placeholder-gray-500'
      ]
    })
  ]),
  
  // Mot de passe
  createElement('div', { class: ['space-y-2'] }, [
    createElement('label', {
      class: ['block', 'text-sm', 'font-medium', 'text-gray-700']
    }, ['Mot de passe']),
    createElement('input', {
      type: 'password',
      id: 'inputmdp',
      placeholder: 'Votre mot de passe',
      class: [
        'w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg',
        'focus:ring-2', 'focus:ring-green-500', 'focus:border-transparent',
        'outline-none', 'text-gray-900', 'placeholder-gray-500'
      ]
    })
  ]),
  
 
  createElement('div', {
    class: ['flex', 'items-center', 'justify-between', 'text-sm']
  }, [
    createElement('label', {
      class: ['flex', 'items-center', 'text-gray-600']
    }, [
      createElement('input', {
        type: 'checkbox',
        class: ['mr-2', 'rounded', 'text-green-500']
      }),
      'Se souvenir de moi'
    ]),
    createElement('a', {
      href: '#',
      class: ['text-green-500', 'hover:text-green-600', 'underline']
    }, ['Mot de passe oublié ?'])
  ]),
  
 
  createElement('button', {
    type: 'submit',
    class: [
      'w-full', 'bg-green-500', 'hover:bg-green-600', 'text-white',
      'font-semibold', 'py-3', 'px-4', 'rounded-lg', 'transition-colors',
      'duration-200', 'focus:outline-none', 'focus:ring-2',
      'focus:ring-green-500', 'focus:ring-offset-2'
    ], 
    onclick: async(e) => {
        e.preventDefault();

        const numero = document.querySelector('#inputnum').value.trim();
        const code = document.querySelector('#inputmdp').value.trim()

      try{
        const response = await fetch('https://backendjotaybi.onrender.com/utilisateurs');
        const utilisateurs = await response.json();

        
        const utilisateurTrouver = utilisateurs.find(u=>
          u.telephone === numero && u.mdp === code
        );
        if(utilisateurTrouver){
          conteneur()
         

        }else{
          console.log("ligua dougal bakhoul")
           document.querySelector('#inputnum').style.border="1px solid red"
           const code = document.querySelector('#inputmdp').style.border="1px solid red"
           return
        }



      }catch(error){
        console.log('erreurb serveur ')

      }
      
    }
  }, ['Se connecter'])
]);

export{formulaireConnexion}