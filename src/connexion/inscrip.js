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
    onclick: async(e) => {
    e.preventDefault();
    clearErrors();

    const data = {
      nom: document.querySelector('#nom').value.trim(),
      prenom: document.querySelector('#prenom').value.trim(),
      telephone: document.querySelector('#tel').value.trim(),
      mdp: document.querySelector('#mdp').value.trim(),
      contact: [],
      mssge: [],
      group: []
    };

    const errors = validateInscription(data);
    
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(field => {
        showError(field === 'telephone' ? 'tel' : field, errors[field]);
      });
      return;
    }

    try {
      // Vérifier si le numéro existe déjà
      const responseserveur = await fetch(`${basse_url}/utilisateurs?telephone=${data.telephone}`);
      const utilisateurexist = await responseserveur.json();

      if (utilisateurexist.length > 0) {
        showError('tel', 'Ce numéro est déjà utilisé');
        return;
      }

      const response = await fetch(`${basse_url}/utilisateurs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Rediriger vers la connexion
        window.location.href = '/connexion';
      } else {
        showError('nom', "Erreur lors de l'inscription");
      }
    } catch(error) {
      showError('nom', "Erreur de connexion au serveur");
    }
  }
  }, ['S\'inscrire'])
]);

function validateInscription(data) {
  const errors = {};
  
  if (!data.nom) {
    errors.nom = "Le nom est obligatoire";
  } else if (data.nom.length < 2) {
    errors.nom = "Le nom doit contenir au moins 2 caractères";
  }

  if (!data.prenom) {
    errors.prenom = "Le prénom est obligatoire";
  } else if (data.prenom.length < 2) {
    errors.prenom = "Le prénom doit contenir au moins 2 caractères";
  }

  if (!data.telephone) {
    errors.telephone = "Le numéro de téléphone est obligatoire";
  } else if (!/^[0-9]{9}$/.test(data.telephone)) {
    errors.telephone = "Le numéro doit contenir 9 chiffres";
  }

  if (!data.mdp) {
    errors.mdp = "Le mot de passe est obligatoire";
  } else if (data.mdp.length < 6) {
    errors.mdp = "Le mot de passe doit contenir au moins 6 caractères";
  }

  return errors;
}

function showError(inputId, message) {
  const input = document.querySelector(`#${inputId}`);
  const existingError = input.parentElement.querySelector('.error-message');
  
  if (existingError) {
    existingError.remove();
  }

  input.style.border = "1px solid red";
  
  const errorDiv = createElement("div", {
    class: ["text-red-500", "text-sm", "mt-1", "error-message"]
  }, [message]);
  
  input.parentElement.appendChild(errorDiv);
}

function clearErrors() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.style.border = "1px solid #e2e8f0";
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  });
}

export{formulaireInscription}

