import "./style.css";
import { createElement } from "./compenent.js";
import { barLogo, popupParametres } from "./barreLogo.js";
import { grandBr } from "./grandbarre.js";
import { pgrandBr } from "./pgrand.js";
// import {affichage} from "./validateur/fonctionValidate.js";
import { mainContainer } from "./connexion/connexion.js";

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
  [mainContainer, containeur,popupParametres]
);

// , barLogo, grandBr, pgrandBr

 document.body.append(app);
// document.querySelector("#app").appendChild(barLogo);
// document.querySelector("#app").appendChild(popupParametres);

const form = document.querySelector("#inscription");
const form2 = document.querySelector("#connexion");
const content = document.querySelector("#containeur");

form.classList.add("hide");

export function conteneur() {
  content.classList.remove("hide");
  mainContainer.classList.add("hide");
}

export function affichage() {
  form.classList.remove("hide");
  form2.classList.add("hide", "bg-white");
}

export function affichageconnexion() {
  form.classList.add("hide");
  form2.classList.remove("hide", "bg-white");
}

