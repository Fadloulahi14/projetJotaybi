import { createElement } from "../compenent";
import { basse_url } from "../validateur/fonctionValidate.js";

function creerFormulaireContact() {
  return createElement("div", {
    id: "nouveau-contact-form",
    class: [
      "fixed", "inset-0", "bg-black", "bg-opacity-50",
      "flex", "items-center", "justify-center", "z-50", "hidden"
    ]
  }, [
    createElement("div", {
      class: [
        "bg-white", "rounded-lg", "p-6", "w-[400px]",
        "shadow-xl", "relative"
      ]
    }, [
      // Header
      createElement("div", {
        class: ["flex", "justify-between", "items-center", "mb-4"]
      }, [
        createElement("h2", {
          class: ["text-xl", "font-semibold"]
        }, ["Ajouter un contact"]),
        createElement("button", {
          class: ["text-gray-500", "hover:text-gray-700"],
          onClick: () => {
            document.querySelector("#nouveau-contact-form").classList.add("hidden");
          }
        }, [
          createElement("i", {
            class: ["fas", "fa-times"]
          })
        ])
      ]),

      // Formulaire
      createElement("form", {
        class: ["space-y-4"],
        onsubmit: async (e) => {
          e.preventDefault();
          const data = {
            prenom: e.target.prenom.value,
            nom: e.target.nom.value,
            telephone: e.target.telephone.value,
            mdp: e.target.mdp.value,
            contact: [],
            mssge: [],
            group: []
          };

          try {
            const response = await fetch(`${basse_url}/utilisateurs`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            });

            if (response.ok) {
              document.querySelector("#nouveau-contact-form").classList.add("hidden");
              // Rafraîchir la liste des contacts
              afficherListeContacts();
            }
          } catch (error) {
            console.error("Erreur lors de l'ajout:", error);
          }
        }
      }, [
        createElement("div", {}, [
          createElement("label", {
            class: ["block", "text-sm", "font-medium", "text-gray-700", "mb-1"]
          }, ["Prénom"]),
          createElement("input", {
            type: "text",
            name: "prenom",
            required: true,
            class: [
              "w-full", "px-3", "py-2", "border", "border-gray-300",
              "rounded-md", "focus:outline-none", "focus:ring-2",
              "focus:ring-green-500"
            ]
          })
        ]),
        createElement("div", {}, [
          createElement("label", {
            class: ["block", "text-sm", "font-medium", "text-gray-700", "mb-1"]
          }, ["Nom"]),
          createElement("input", {
            type: "text",
            name: "nom",
            required: true,
            class: [
              "w-full", "px-3", "py-2", "border", "border-gray-300",
              "rounded-md", "focus:outline-none", "focus:ring-2",
              "focus:ring-green-500"
            ]
          })
        ]),
        createElement("div", {}, [
          createElement("label", {
            class: ["block", "text-sm", "font-medium", "text-gray-700", "mb-1"]
          }, ["Téléphone"]),
          createElement("input", {
            type: "tel",
            name: "telephone",
            required: true,
            class: [
              "w-full", "px-3", "py-2", "border", "border-gray-300",
              "rounded-md", "focus:outline-none", "focus:ring-2",
              "focus:ring-green-500"
            ]
          })
        ]),
        createElement("div", {}, [
          createElement("label", {
            class: ["block", "text-sm", "font-medium", "text-gray-700", "mb-1"]
          }, ["Mot de passe"]),
          createElement("input", {
            type: "password",
            name: "mdp",
            required: true,
            class: [
              "w-full", "px-3", "py-2", "border", "border-gray-300",
              "rounded-md", "focus:outline-none", "focus:ring-2",
              "focus:ring-green-500"
            ]
          })
        ]),
        createElement("button", {
          type: "submit",
          class: [
            "w-full", "bg-green-500", "text-white", "py-2",
            "rounded-md", "hover:bg-green-600", "transition-colors"
          ]
        }, ["Ajouter"])
      ])
    ])
  ]);
}

async function afficherListeContacts() {
  const response = await fetch(`${basse_url}/utilisateurs`);
  const utilisateurs = await response.json();
  const moi = JSON.parse(localStorage.getItem("utilisateurConnecte"));

  const contactList = document.querySelector("#contact-list");
  contactList.innerHTML = "";

  utilisateurs.forEach(user => {
    if (user.id !== moi.id) {
      const contact = createElement("div", {
        class: [
          "flex", "items-center", "px-6", "py-3",
          "hover:bg-gray-50", "cursor-pointer"
        ],
        onClick: async () => {
          // Ajouter ce contact à ma liste
          if (!moi.contact.includes(user.id)) {
            moi.contact.push(user.id);
            await fetch(`${basse_url}/utilisateurs/${moi.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ contact: moi.contact })
            });
            localStorage.setItem("utilisateurConnecte", JSON.stringify(moi));
          }
        }
      }, [
        createElement("div", {
          class: ["flex-1"]
        }, [
          createElement("h3", {
            class: ["font-medium"]
          }, [`${user.prenom} ${user.nom}`]),
          createElement("p", {
            class: ["text-sm", "text-gray-500"]
          }, [user.telephone])
        ]),
        moi.contact.includes(user.id) ?
          createElement("i", {
            class: ["fas", "fa-check", "text-green-500"]
          }) : null
      ]);
      contactList.appendChild(contact);
    }
  });
}

// Modifier le click handler dans entete.js
function handleNouveauContact() {
  const formulaire = document.querySelector("#nouveau-contact-form");
  if (!formulaire) {
    document.body.appendChild(creerFormulaireContact());
  }
  document.querySelector("#nouveau-contact-form").classList.remove("hidden");
  afficherListeContacts();
}

export { handleNouveauContact };