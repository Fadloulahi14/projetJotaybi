import "./style.css";
import { createElement } from "./compenent.js";
import { barLogo, popupParametres } from "./barreLogo.js";
import { grandBr } from "./grandbarre.js";
import { pgrandBr } from "./pgrand.js";
import { mainContainer } from "./connexion/connexion.js";
import { statutManager } from "./fonctionGrbarr/statutManager.js";
import { profilManager } from "./fonctionGrbarr/profilManager.js";

// Vérifier l'état de connexion au chargement
function checkAuthState() {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));
  const containeur = document.querySelector("#containeur");
  const main = document.querySelector("#app");

  if (utilisateur?.id) {
    // Utilisateur connecté
    if (containeur) {
      containeur.classList.remove("hide");
      mainContainer.classList.add("hide");
    } else {
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
      main.appendChild(popupParametres);
    }
  } else {
    // Utilisateur non connecté
    if (containeur) {
      containeur.classList.add("hide");
      mainContainer.classList.remove("hide");
    }
  }
}

const containeur = createElement(
  "div",
  {
    class: ["flex", "w-full", "h-screen", "bg-white", "hide"],
    id: "containeur",
  },
  [barLogo, grandBr, pgrandBr]
);

const app = createElement(
  "div",
  {
    id: "app",
    class: ["flex", "w-full", "h-screen", "bg-white"],
  },
  [mainContainer, containeur, popupParametres]
);

document.body.append(app);

document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
});


window.addEventListener('load', () => {
  checkAuthState();
});

const form = document.querySelector("#inscription");
const form2 = document.querySelector("#connexion");
const content = document.querySelector("#containeur");

form?.classList.add("hide");

export function conteneur() {
  checkAuthState();
}

export function affichage() {
  form?.classList.remove("hide");
  form2?.classList.add("hide", "bg-white");
}

export function affichageconnexion() {
  form?.classList.add("hide");
  form2?.classList.remove("hide", "bg-white");
}

// Initialiser le gestionnaire de statuts
statutManager.init();

// Initialiser le gestionnaire de profil
profilManager.init();

