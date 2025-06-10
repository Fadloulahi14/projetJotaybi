import { createElement } from "./compenent.js";
// import "./style.css";

const contacts = [];
const groupes = [];

export function AjouterContact() {
  if (document.getElementById("form-ajout-contact")) return;

  const zoneFormulaire = document.getElementById("zone-formulaire");
  if (!zoneFormulaire) return;

  const formulaire = createElement("div", {
    id: "form-ajout-contact",
    class: "bg-white w-full max-w-md p-6 rounded-xl shadow space-y-4 border border-red-300 mt-4"
  }, [
    createElement("h2", {
      class: "text-xl font-semibold text-center text-gray-800"
    }, ["Ajouter un contact"]),

    createElement("input", {
      type: "text",
      id: "input-nom",
      placeholder: "Nom",
      class: "w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
    }),

    createElement("input", {
      type: "text",
      id: "input-phone",
      placeholder: "Téléphone",
      class: "w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
    }),

    createElement("div", { class: "flex justify-end gap-2" }, [
      createElement("button", {
        class: "px-4 py-2 bg-red-200 text-black rounded hover:bg-red-300",
        onclick: () => formulaire.remove()
      }, ["Annuler"]),

      createElement("button", {
        class: "px-4 py-2 bg-[#e7d39f] text-white rounded hover:bg-yellow-100",
        onclick: () => {
          const nomInput = document.getElementById("input-nom");
          const phoneInput = document.getElementById("input-phone");

          let nom = nomInput.value.trim();
          const phone = phoneInput.value.trim();

          if (nom === "" || phone === "") {
            alert("Le nom et le téléphone sont obligatoires.");
            return;
          }

          if (!/^\d+$/.test(phone)) {
            alert("Le numéro de téléphone doit contenir uniquement des chiffres.");
            return;
          }

          const existe = contacts.some(c => c.phone === phone);
          if (existe) {
            alert("Ce numéro est déjà attribué à un autre contact.");
            return;
          }

          // Si le nom existe déjà, on numérote
          let baseNom = nom;
          let index = 1;
          while (contacts.some(c => c.nom === nom)) {
            nom = `${baseNom}-${index++}`;
          }

          contacts.push({ nom, phone });
          formulaire.remove();
          afficherContacts(); // mise à jour immédiate
        }
      }, ["Ajouter"])
    ])
  ]);

  zoneFormulaire.appendChild(formulaire);
}

export function afficherContacts() {
  const listContact = document.getElementById("liste-contacts");
  if (!listContact) return;

  listContact.innerHTML = "";

  contacts.forEach(contact => {
    const item = createElement("div", {
      class: "w-[90%] h-12 border-b border-black ml-2 flex items-center justify-between px-4",
    }, [
      createElement("h5", { class: "text-black font-medium" }, [contact.nom]),
      createElement("input", { type: "checkbox", value: contact.nom, class: "w-4 h-4" }, []),
    ]);

    listContact.appendChild(item);
  });
}

export function afficherInterfaceGroupes() {
  const section = document.getElementById("section-groupes");
  section.innerHTML = "";

  const btnAjoutGroupe = createElement("button", {
    class: "bg-[#e7d39f] text-white px-4 py-2 rounded shadow hover:bg-yellow-600",
    onclick: afficherFormulaireGroupe,
  }, ["Ajouter un groupe"]);

  const listeGroupes = createElement("div", {
    id: "liste-groupes",
    class: "space-y-2",
  });

  section.appendChild(btnAjoutGroupe);
  section.appendChild(listeGroupes);
  afficherListeDesGroupes();
}

function afficherFormulaireGroupe() {
  const section = document.getElementById("section-groupes");

  const form = createElement("div", {
    class: "bg-white shadow-md p-4 rounded-lg space-y-4 border border-gray-300",
  }, [
    createElement("input", {
      type: "text",
      placeholder: "Nom du groupe",
      id: "nom-groupe",
      class: "w-full border px-3 py-2 rounded-md",
    }),

    createElement("div", { class: "space-y-1" }, contacts.map(contact =>
      createElement("label", { class: "flex items-center gap-2" }, [
        createElement("input", {
          type: "checkbox",
          value: contact.nom,
          class: "w-4 h-4",
        }),
        createElement("span", {}, [contact.nom]),
      ])
    )),

    createElement("button", {
      class: "bg-[#e7d39f] text-white px-4 py-2 rounded",
      onclick: () => {
        const nomGroupe = document.getElementById("nom-groupe").value.trim();
        const membres = Array.from(form.querySelectorAll("input[type='checkbox']:checked")).map(cb => cb.value);

        if (!nomGroupe) return alert("Le nom du groupe est requis.");
        if (membres.length < 2) return alert("Un groupe doit contenir au moins 2 membres.");

        groupes.push({ nom: nomGroupe, membres, admin: "admin" });
        afficherInterfaceGroupes();
      }
    }, ["Valider le groupe"])
  ]);

  section.appendChild(form);
}

function afficherListeDesGroupes() {
  const liste = document.getElementById("liste-groupes");
  liste.innerHTML = "";

  groupes.forEach(grp => {
    const bloc = createElement("div", {
      class: "border p-3 rounded bg-gray-100 flex justify-rounded items-center",
    }, [
      createElement("div", {
        style: {
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "1px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      }, [createElement("span", {}, [grp.nom[0].toUpperCase()])]),

      createElement("h4", { class: "font-semibold ml-[2%]" }, [grp.nom]),

      createElement("span", { class: "text-sm text-gray-600 ml-[30%]" }, [`${grp.membres.length} membres`]),

      createElement("span", { class: "text-xs text-gray-500 ml-auto" }, [`Admin: ${grp.admin}`]),
    ]);

    liste.appendChild(bloc);
  });
}

export function toggleAffichage(sectionToShow) {
  const sections = ["liste-contacts", "section-groupes"];
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    section.classList.toggle("hidden", id !== sectionToShow);
  });
}
