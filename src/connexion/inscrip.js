import { createElement } from "../compenent";
import { basse_url } from "../validateur/fonctionValidate";

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
      id : 'nom',
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
      id : 'prenom',
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
      id : 'tel',
      placeholder: '+221 77 777 77 77',
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
      id : 'mdp',
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
    ], 
    onclick:async(e)=>{
    e.preventDefault(); 

    const form = document.querySelectorAll('input'); 
    const nom = document.querySelector('#nom').value.trim();
    const prenom = document.querySelector('#prenom').value.trim();
    const telephone = document.querySelector('#tel').value.trim();
    const mdp = document.querySelector('#mdp').value.trim();
    const contact = [];
    const mssge = []; 
    const group =[];


    const nouvelUtilisateur = {
      nom, prenom, telephone, mdp, contact,mssge,group
    }

    try{

      const responseserveur = await fetch (`${basse_url}/utilisateurs?telephone=${telephone}`);
      const utilisateurexist = await responseserveur.json(); 

      if(utilisateurexist.length>0){
        console.log('ce numero exist dejaa')
        return;
      }else{
        console.log('ce num nexister pas encores inscription valide')
      }



      const response = await fetch (`${urllocal}/utilisateurs`, {
        method: "post", 
        headers:{
          "content-type": "application/json", 
          "accept":"application/json", 
        },
        body: JSON.stringify(nouvelUtilisateur)
      }); 
      if(response.ok){
        console.log("donner yi dougouna ");
        

        return
        
      }else{
        console.log("donner meunoul dougou parceue matoule")
      }


    }catch(error){
      console.log("erreur bi si serveur bi la neikkk ")

    }

  }
  }, ['S\'inscrire'])
]);






export{formulaireInscription}

