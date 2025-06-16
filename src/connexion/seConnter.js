import { createElement } from "../compenent.js";
import { conteneur } from "../main.js";
import { basse_url } from "../validateur/fonctionValidate.js";
import { barLogo } from "../barreLogo.js";
import { grandBr } from "../grandbarre.js";
import { pgrandBr } from "../pgrand.js";
import { statutManager } from "../fonctionGrbarr/statutManager.js";
import { profilManager } from "../fonctionGrbarr/profilManager.js";
import { groupeManager } from "../fonctionGrbarr/groupeManager.js";
import { conversationManager } from "../fonctionGrbarr/conversation.js";

// Fonction pour démarrer le rafraîchissement automatique
function startAutoRefresh() {
  setInterval(() => {
    if (localStorage.getItem("utilisateurConnecte")) {
      conversationManager.chargerConversations();
    }
  }, 3000);
}

const formulaireConnexion = createElement('form', {
  class: ['space-y-6', 'w-full'], 
  id: "connexion",
  onsubmit: async (e) => {
    e.preventDefault();
    clearErrors();

    const numero = document.querySelector('#inputnum').value.trim();
    const password = document.querySelector('#inputmdp').value.trim();

    const errors = validateForm(numero, password);
    
    if (Object.keys(errors).length > 0) {
      if (errors.numero) showError('inputnum', errors.numero);
      if (errors.password) showError('inputmdp', errors.password);
      return;
    }

    try {
      const response = await fetch(`${basse_url}/utilisateurs`);
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const utilisateurs = await response.json();
      const utilisateurTrouver = utilisateurs.find(u =>
        u.telephone === numero && u.mdp === password
      );

      if (utilisateurTrouver) {
        // Stocker les données utilisateur
        localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateurTrouver));

        // Créer et afficher le conteneur principal sans rechargement
        const main = document.querySelector('#app');
        const newContaineur = createElement(
          "div",
          {
            class: ["flex", "w-full", "h-screen", "bg-white"],
            id: "containeur",
          },
          [barLogo, grandBr, pgrandBr]
        );

        main.innerHTML = '';
        main.appendChild(newContaineur);

        // Initialiser les gestionnaires
        statutManager.init();
        profilManager.init();
        groupeManager.init();
        conversationManager.init();

        // Démarrer le rafraîchissement automatique
        startAutoRefresh();

      } else {
        showError('inputnum', "Numéro ou mot de passe incorrect");
        showError('inputmdp', "Numéro ou mot de passe incorrect");
      }
    } catch(error) {
      console.error('Erreur connexion:', error);
      showError('inputnum', "Erreur de connexion au serveur. Veuillez réessayer.");
    }
  }
}, [
  
  createElement('div', { class: ['space-y-2'] }, [
    createElement('label', {
      class: ['block', 'text-sm', 'font-medium', 'text-gray-700']
    }, ['Numéro de téléphone']),
    createElement('input', {
      type: 'tel',
      placeholder: '+221 77 000 00 00',
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
        clearErrors();

        const numero = document.querySelector('#inputnum').value.trim();
        const password = document.querySelector('#inputmdp').value.trim();

        const errors = validateForm(numero, password);
        
        if (Object.keys(errors).length > 0) {
          if (errors.numero) showError('inputnum', errors.numero);
          if (errors.password) showError('inputmdp', errors.password);
          return;
        }

        try {
          // Récupérer les utilisateurs
          const response = await fetch(`${basse_url}/utilisateurs`);
          const utilisateurs = await response.json();
          
          const utilisateurTrouver = utilisateurs.find(u =>
            u.telephone === numero && u.mdp === password
          );

          if (utilisateurTrouver) {
            // Stocker les données utilisateur
            localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateurTrouver));
            
            // Récupérer les conversations et messages
            const [messages, groupes] = await Promise.all([
              fetch(`${basse_url}/messages`).then(res => res.json()),
              fetch(`${basse_url}/groupes`).then(res => res.json())
            ]);

            // Stocker les messages de l'utilisateur
            localStorage.setItem("messagesUtilisateur", JSON.stringify(
              messages.filter(m => 
                m.emetteur === utilisateurTrouver.id || 
                m.recepteur === utilisateurTrouver.id
              )
            ));

            // Stocker les groupes de l'utilisateur - Correction ici
            localStorage.setItem("groupesUtilisateur", JSON.stringify(
              groupes.filter(g => 
                g.participants && g.participants.includes(utilisateurTrouver.id)
              )
            ));

            // Créer le conteneur principal
            conteneur();

            // Cacher le formulaire de connexion
            const loginForm = document.querySelector('#connexion');
            if (loginForm) {
              loginForm.classList.add('hide');
            }

            // Créer et afficher le conteneur principal sans rechargement
            const main = document.querySelector('#app');
            const newContaineur = createElement(
              "div",
              {
                class: ["flex", "w-full", "h-screen", "bg-white"],
                id: "containeur",
              },
              [barLogo, grandBr, pgrandBr]
            );

            main.innerHTML = '';
            main.appendChild(newContaineur);

            // Initialiser les gestionnaires
            statutManager.init();
            profilManager.init();
            groupeManager.init();
            conversationManager.init();

            // Déclencher le chargement des conversations
            await conversationManager.chargerConversations();

            // Démarrer le rafraîchissement automatique
            startAutoRefresh();

          } else {
            showError('inputnum', "Numéro ou mot de passe incorrect");
            showError('inputmdp', "Numéro ou mot de passe incorrect");
          }
        } catch(error) {
          console.error('Erreur connexion:', error);
          showError('inputnum', "Erreur de connexion au serveur");
        }
      }
  }, ['Se connecter'])
]);

function validateForm(numero, password) {
  const errors = {};
  
  if (!numero) {
    errors.numero = "Le numéro de téléphone est obligatoire";
  } else if (!/^[0-9]{9}$/.test(numero)) {
    errors.numero = "Le numéro doit contenir 9 chiffres";
  }

  if (!password) {
    errors.password = "Le mot de passe est obligatoire";
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

// Modifier le onclick du bouton de connexion
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

    const numero = document.querySelector('#inputnum').value.trim();
    const password = document.querySelector('#inputmdp').value.trim();

    const errors = validateForm(numero, password);
    
    if (Object.keys(errors).length > 0) {
      if (errors.numero) showError('inputnum', errors.numero);
      if (errors.password) showError('inputmdp', errors.password);
      return;
    }

    try {
      // Récupérer les utilisateurs
      const response = await fetch(`${basse_url}/utilisateurs`);
      const utilisateurs = await response.json();
      
      const utilisateurTrouver = utilisateurs.find(u =>
        u.telephone === numero && u.mdp === password
      );

      if (utilisateurTrouver) {
        // Stocker les données utilisateur
        localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateurTrouver));
        
        // Récupérer les conversations et messages
        const [messages, groupes] = await Promise.all([
          fetch(`${basse_url}/messages`).then(res => res.json()),
          fetch(`${basse_url}/groupes`).then(res => res.json())
        ]);

        // Stocker les messages de l'utilisateur
        localStorage.setItem("messagesUtilisateur", JSON.stringify(
          messages.filter(m => 
            m.emetteur === utilisateurTrouver.id || 
            m.recepteur === utilisateurTrouver.id
          )
        ));

        // Stocker les groupes de l'utilisateur - Correction ici
        localStorage.setItem("groupesUtilisateur", JSON.stringify(
          groupes.filter(g => 
            g.participants && g.participants.includes(utilisateurTrouver.id)
          )
        ));

        // Créer le conteneur principal
        conteneur();

        // Cacher le formulaire de connexion
        const loginForm = document.querySelector('#connexion');
        if (loginForm) {
          loginForm.classList.add('hide');
        }

        // Créer et afficher le conteneur principal sans rechargement
        const main = document.querySelector('#app');
        const newContaineur = createElement(
          "div",
          {
            class: ["flex", "w-full", "h-screen", "bg-white"],
            id: "containeur",
          },
          [barLogo, grandBr, pgrandBr]
        );

        main.innerHTML = '';
        main.appendChild(newContaineur);

        // Initialiser les gestionnaires
        statutManager.init();
        profilManager.init();
        groupeManager.init();
        conversationManager.init();

        // Déclencher le chargement des conversations
        await conversationManager.chargerConversations();

        // Démarrer le rafraîchissement automatique
        startAutoRefresh();

      } else {
        showError('inputnum', "Numéro ou mot de passe incorrect");
        showError('inputmdp', "Numéro ou mot de passe incorrect");
      }
    } catch(error) {
      console.error('Erreur connexion:', error);
      showError('inputnum', "Erreur de connexion au serveur");
    }
  }
}, ['Se connecter'])

export{formulaireConnexion}
// export{utilisateurTrouver}