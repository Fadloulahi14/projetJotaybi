import { createElement } from "../compenent.js";
import { basse_url } from "../validateur/fonctionValidate.js";
import { conversationManager } from "./conversation.js";

class ConversationMenuManager {
  constructor() {
    this.menuPopup = null;
    this.blockedContacts = new Set();
    this.archivedContacts = new Set();
    // Lier les méthodes au contexte de la classe
    this.getMemberInfo = this.getMemberInfo.bind(this);
  }

  // Méthode modifiée pour la récupération des infos des membres
  async getMemberInfo(memberId) {
    try {
      const response = await fetch(`${basse_url}/utilisateurs/${memberId}`);
      if (!response.ok) throw new Error('Erreur récupération utilisateur');
      const membre = await response.json();
      return membre ? {
        id: membre.id,
        nom: `${membre.prenom} ${membre.nom}`,
        telephone: membre.telephone
      } : null;
    } catch (error) {
      console.error('Erreur récupération membre:', error);
      return null;
    }
  }

  createContactMenu(contact) {
    return createElement('div', {
      class: [
        "absolute", "right-0", "top-16", "bg-white", "shadow-lg",
        "rounded-lg", "w-56", "py-2", "z-50"
      ]
    }, [
      createElement('div', {
        class: ["px-4", "py-2", "hover:bg-gray-100", "cursor-pointer", "flex", "items-center", "gap-3"],
        onClick: () => this.blockContact(contact)
      }, [
        createElement('i', { class: ["fas", "fa-ban", "text-red-500"] }),
        "Bloquer le contact"
      ]),
      createElement('div', {
        class: ["px-4", "py-2", "hover:bg-gray-100", "cursor-pointer", "flex", "items-center", "gap-3"],
        onClick: () => this.archiveContact(contact)
      }, [
        createElement('i', { class: ["fas", "fa-archive", "text-gray-500"] }),
        "Archiver la discussion"
      ]),
      createElement('div', {
        class: ["px-4", "py-2", "hover:bg-gray-100", "cursor-pointer", "flex", "items-center", "gap-3", "text-red-500"],
        onClick: () => this.deleteContact(contact)
      }, [
        createElement('i', { class: ["fas", "fa-trash"] }),
        "Supprimer le contact"
      ])
    ]);
  }

  createGroupMenu(group) {
    const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    const isAdmin = group.admin === moi.id;

    return createElement('div', {
      class: [
        "absolute", "right-0", "top-16", "bg-white", "shadow-lg",
        "rounded-lg", "w-64", "py-2", "z-50"
      ]
    }, [
      // Options disponibles pour tous les membres
      createElement('div', {
        class: ["px-4", "py-2", "hover:bg-gray-100", "cursor-pointer", "flex", "items-center", "gap-3"],
        onClick: () => this.viewGroupInfo(group)
      }, [
        createElement('i', { class: ["fas", "fa-info-circle", "text-blue-500"] }),
        "Infos du groupe"
      ]),

      // Options réservées aux admins
      ...(isAdmin ? [
        createElement('div', {
          class: ["px-4", "py-2", "hover:bg-gray-100", "cursor-pointer", "flex", "items-center", "gap-3"],
          onClick: () => this.addMemberToGroup(group)
        }, [
          createElement('i', { class: ["fas", "fa-user-plus", "text-green-500"] }),
          "Ajouter des participants"
        ]),
        createElement('div', {
          class: ["px-4", "py-2", "hover:bg-gray-100", "cursor-pointer", "flex", "items-center", "gap-3"],
          onClick: () => this.manageMembersGroup(group)
        }, [
          createElement('i', { class: ["fas", "fa-users-cog", "text-gray-500"] }),
          "Gérer les participants"
        ]),
        createElement('div', {
          class: ["px-4", "py-2", "hover:bg-gray-100", "cursor-pointer", "flex", "items-center", "gap-3"],
          onClick: () => this.editGroupInfo(group)
        }, [
          createElement('i', { class: ["fas", "fa-edit", "text-blue-500"] }),
          "Modifier les infos du groupe"
        ])
      ] : []),

      // Option de quitter le groupe pour tous sauf l'admin principal
      ...(group.admin !== moi.id ? [
        createElement('div', {
          class: ["px-4", "py-2", "hover:bg-gray-100", "cursor-pointer", "flex", "items-center", "gap-3", "text-red-500"],
          onClick: () => this.leaveGroup(group)
        }, [
          createElement('i', { class: ["fas", "fa-sign-out-alt"] }),
          "Quitter le groupe"
        ])
      ] : [])
    ]);
  }

  async blockContact(contact) {
    const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    try {
      if (!moi.blockedContacts) moi.blockedContacts = [];
      moi.blockedContacts.push(contact.id);
      
      await fetch(`${basse_url}/utilisateurs/${moi.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blockedContacts: moi.blockedContacts })
      });

      localStorage.setItem('utilisateurConnecte', JSON.stringify(moi));
      this.blockedContacts.add(contact.id);
      await conversationManager.chargerConversations();
      this.closeMenu();
    } catch (error) {
      console.error('Erreur blocage contact:', error);
    }
  }

  async archiveContact(contact) {
    const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    try {
      if (!moi.archivedContacts) moi.archivedContacts = [];
      moi.archivedContacts.push(contact.id);
      
      await fetch(`${basse_url}/utilisateurs/${moi.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archivedContacts: moi.archivedContacts })
      });

      localStorage.setItem('utilisateurConnecte', JSON.stringify(moi));
      this.archivedContacts.add(contact.id);
      await conversationManager.chargerConversations();
      this.closeMenu();
    } catch (error) {
      console.error('Erreur archivage contact:', error);
    }
  }

  async deleteContact(contact) {
    const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    try {
      moi.contact = moi.contact.filter(id => id !== contact.id);
      
      await fetch(`${basse_url}/utilisateurs/${moi.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: moi.contact })
      });

      localStorage.setItem('utilisateurConnecte', JSON.stringify(moi));
      await conversationManager.chargerConversations();
      this.closeMenu();
    } catch (error) {
      console.error('Erreur suppression contact:', error);
    }
  }

  async viewGroupInfo(group) {
    try {
      const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
      const isAdmin = group.admin === moi.id;
      const membresPromises = group.membres.map(this.getMemberInfo);
      const membres = await Promise.all(membresPromises);

      const popup = createElement('div', {
        class: [
          "fixed", "inset-0", "bg-black", "bg-opacity-50",
          "flex", "items-center", "justify-center", "z-50"
        ]
      }, [
        createElement('div', {
          class: ["bg-white", "w-96", "rounded-lg", "shadow-xl", "overflow-hidden"]
        }, [
          // En-tête
          createElement('div', {
            class: ["px-6", "py-4", "border-b", "border-gray-200", "flex", "justify-between", "items-center"]
          }, [
            createElement('h3', { class: ["text-lg", "font-semibold"] }, ["Infos du groupe"]),
            createElement('button', {
              class: ["text-gray-500", "hover:text-gray-700"],
              onClick: () => popup.remove()
            }, [createElement('i', { class: ["fas", "fa-times"] })])
          ]),
          
          // Contenu
          createElement('div', { class: ["p-6"] }, [
            // Photo et nom du groupe
            createElement('div', { class: ["flex", "items-center", "space-x-4", "mb-6"] }, [
              createElement('div', {
                class: ["w-16", "h-16", "bg-gray-200", "rounded-full", "flex", "items-center", "justify-center"]
              }, [createElement('i', { class: ["fas", "fa-users", "text-gray-400", "text-xl"] })]),
              createElement('div', {}, [
                createElement('h4', { class: ["font-medium", "text-lg"] }, [group.nom]),
                createElement('p', { class: ["text-sm", "text-gray-500"] }, 
                  [`${group.membres.length} participants`]
                )
              ])
            ]),
            
            // Section des participants avec en-tête et bouton d'ajout
            createElement('div', { class: ["mt-6"] }, [
              createElement('div', {
                class: ["flex", "items-center", "justify-between", "mb-4"]
              }, [
                createElement('h5', { 
                  class: ["font-medium"] 
                }, ["Participants"]),
                // Bouton d'ajout de participants (visible uniquement pour l'admin)
                isAdmin && createElement('button', {
                  class: [
                    "flex", "items-center", "gap-2", "text-green-600",
                    "hover:text-green-700", "text-sm", "font-medium"
                  ],
                  onClick: () => {
                    popup.remove(); // Fermer la popup des infos
                    this.addMemberToGroup(group); // Ouvrir la popup d'ajout
                  }
                }, [
                  createElement('i', { class: ["fas", "fa-user-plus"] }),
                  "Ajouter"
                ])
              ]),
              // Liste des membres
              createElement('div', { 
                class: ["space-y-2", "max-h-64", "overflow-y-auto"] 
              }, [
                ...membres.filter(m => m).map(membre => 
                  createElement('div', {
                    class: ["flex", "items-center", "justify-between", "py-2", "hover:bg-gray-50", "rounded-lg", "px-2"]
                  }, [
                    createElement('div', { class: ["flex", "items-center", "gap-3"] }, [
                      createElement('div', {
                        class: ["w-8", "h-8", "bg-gray-200", "rounded-full", "flex", "items-center", "justify-center"]
                      }, [createElement('i', { class: ["fas", "fa-user", "text-gray-400"] })]),
                      createElement('div', {}, [
                        createElement('span', { class: ["font-medium"] }, [membre.nom]),
                        createElement('p', { class: ["text-sm", "text-gray-500"] }, [membre.telephone])
                      ])
                    ]),
                    createElement('div', { class: ["flex", "items-center", "gap-2"] }, [
                      // Badge Admin
                      group.admin === membre.id && createElement('span', {
                        class: ["text-xs", "text-green-500", "font-medium", "bg-green-50", "px-2", "py-1", "rounded-full"]
                      }, ["Admin"]),
                    ])
                  ])
                )
              ])
            ])
          ])
        ])
      ]);

      document.body.appendChild(popup);
    } catch (error) {
      console.error('Erreur affichage infos groupe:', error);
    }
  }

  // Méthode modifiée pour l'ajout de membres
  async addMemberToGroup(group) {
    try {
      const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
      if (!moi || !moi.id) throw new Error('Utilisateur non connecté');

      const [response, groupResponse] = await Promise.all([
        fetch(`${basse_url}/utilisateurs`),
        fetch(`${basse_url}/groupes/${group.id}`)
      ]);

      if (!response.ok || !groupResponse.ok) {
        throw new Error('Erreur récupération données');
      }

      const [utilisateurs, groupActuel] = await Promise.all([
        response.json(),
        groupResponse.json()
      ]);

      // Utiliser les données du groupe actualisées
      const membresActuels = groupActuel.membres || [];
      
      // Filtrer les contacts disponibles
      const contactsDisponibles = utilisateurs.filter(u => 
        moi.contact?.includes(u.id) && 
        !membresActuels.includes(u.id) &&
        u.id !== moi.id
      );

      // Créer et afficher la popup
      const popup = this.createAddMemberPopup(contactsDisponibles, group, membresActuels);
      document.body.appendChild(popup);

    } catch (error) {
      console.error('Erreur chargement contacts:', error);
      this.showError("Impossible de charger les contacts");
    }
  }

  // Nouvelle méthode pour créer la popup d'ajout de membres
  createAddMemberPopup(contacts, group, currentMembers) {
    const popup = createElement('div', {
      id: 'add-member-popup',
      class: [
        "fixed", "inset-0", "bg-black", "bg-opacity-50",
        "flex", "items-center", "justify-center", "z-50"
      ]
    }, [
      createElement('div', {
        class: ["bg-white", "w-96", "rounded-lg", "shadow-xl", "overflow-hidden"]
      }, [
        // En-tête
        this.createPopupHeader("Ajouter des participants"),
        
        // Barre de recherche
        this.createSearchBar(),
        
        // Liste des contacts
        this.createContactsList(contacts, group, currentMembers)
      ])
    ]);

    return popup;
  }

  // Nouvelle méthode pour gérer l'ajout d'un membre
  async handleAddMember(contact, group, currentMembers) {
    try {
      const updatedMembers = [...currentMembers, contact.id];
      
      const response = await fetch(`${basse_url}/groupes/${group.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membres: updatedMembers })
      });

      if (!response.ok) throw new Error('Erreur mise à jour groupe');

      // Fermer la popup et rafraîchir
      document.getElementById('add-member-popup')?.remove();
      await conversationManager.chargerConversations();
      
      // Mettre à jour l'affichage du groupe
      this.viewGroupInfo({...group, membres: updatedMembers});

    } catch (error) {
      console.error('Erreur ajout membre:', error);
      this.showError("Impossible d'ajouter le membre");
    }
  }

  // Méthode pour afficher les erreurs
  showError(message) {
    const errorPopup = createElement('div', {
      class: [
        "fixed", "bottom-4", "right-4", "bg-red-500", "text-white",
        "px-6", "py-3", "rounded-lg", "shadow-lg", "z-50"
      ]
    }, [message]);

    document.body.appendChild(errorPopup);
    setTimeout(() => errorPopup.remove(), 3000);
  }

  async manageMembersGroup(group) {
    // Implémenter la gestion des membres
    this.closeMenu();
  }

  async editGroupInfo(group) {
    // Implémenter l'édition des infos
    this.closeMenu();
  }

  async leaveGroup(group) {
    const popup = createElement('div', {
      class: [
        "fixed", "inset-0", "bg-black", "bg-opacity-50",
        "flex", "items-center", "justify-center", "z-50"
      ]
    }, [
      createElement('div', {
        class: ["bg-white", "w-96", "rounded-lg", "shadow-xl", "overflow-hidden"]
      }, [
        // En-tête
        createElement('div', {
          class: ["px-6", "py-4", "border-b", "border-gray-200"]
        }, [
          createElement('h3', { 
            class: ["text-lg", "font-semibold"] 
          }, ["Quitter le groupe"]),
        ]),
        
        // Message
        createElement('div', {
          class: ["p-6"]
        }, [
          createElement('p', {
            class: ["text-gray-600"]  
          }, [`Êtes-vous sûr de vouloir quitter le groupe "${group.nom}" ?`])
        ]),
        
        // Boutons
        createElement('div', {
          class: ["px-6", "py-4", "bg-gray-50", "flex", "justify-end", "gap-3"]
        }, [
          // Bouton Annuler
          createElement('button', {
            class: [
              "px-4", "py-2", "rounded-lg",
              "text-gray-600", "hover:bg-gray-100"
            ],
            onClick: () => popup.remove()
          }, ["Annuler"]),
          
          // Bouton Quitter
          createElement('button', {
            class: [
              "px-4", "py-2", "rounded-lg", "bg-red-500",
              "text-white", "hover:bg-red-600"
            ],
            onClick: async () => {
              const moi = JSON.parse(localStorage.getItem('utilisateurConnecte'));
              try {
                const updatedMembres = group.membres.filter(id => id !== moi.id);
                
                await fetch(`${basse_url}/groupes/${group.id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ membres: updatedMembres })
                });

                popup.remove();
                this.closeMenu();
                await conversationManager.chargerConversations();
                
              } catch (error) {
                console.error('Erreur quitter groupe:', error);
              }
            }
          }, ["Quitter le groupe"])
        ])
      ])
    ]);

    document.body.appendChild(popup);
  }

  closeMenu() {
    if (this.menuPopup) {
      this.menuPopup.remove();
      this.menuPopup = null;
    }
  }

  showMenu(type, data) {
    this.closeMenu();
    this.menuPopup = type === 'groupe' ? 
      this.createGroupMenu(data) : 
      this.createContactMenu(data);
    document.body.appendChild(this.menuPopup);

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
      if (this.menuPopup && !this.menuPopup.contains(e.target)) {
        this.closeMenu();
      }
    });
  }

  createSearchBar() {
    return createElement('div', {
      class: ["px-4", "py-3", "border-b", "border-gray-200"]
    }, [
      createElement('input', {
        type: 'text',
        placeholder: 'Rechercher un contact',
        class: [
          "w-full", "px-3", "py-2", "rounded-lg", "border", 
          "border-gray-300", "focus:outline-none", 
          "focus:ring-2", "focus:ring-green-500"
        ],
        onInput: (e) => {
          const searchTerm = e.target.value.toLowerCase();
          const items = document.querySelectorAll('.contact-item');
          items.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            item.style.display = name.includes(searchTerm) ? 'flex' : 'none';
          });
        }
      })
    ]);
  }

  createContactsList(contacts, group, currentMembers) {
    return createElement('div', {
      class: ["max-h-96", "overflow-y-auto"]
    }, [
      contacts.length === 0 ? 
        createElement('div', {
          class: ["p-4", "text-center", "text-gray-500"]
        }, ["Aucun contact disponible"]) :
        createElement('div', {
          class: ["divide-y", "divide-gray-200"]
        }, contacts.map(contact => 
          createElement('div', {
            class: [
              "contact-item", "flex", "items-center", "px-4", "py-3",
              "hover:bg-gray-50", "cursor-pointer"
            ],
            'data-name': `${contact.prenom} ${contact.nom}`,
            onClick: () => this.handleAddMember(contact, group, currentMembers)
          }, [
            createElement('div', {
              class: ["w-10", "h-10", "bg-gray-200", "rounded-full", 
                      "flex", "items-center", "justify-center", "mr-3"]
            }, [
              createElement('i', {
                class: ["fas", "fa-user", "text-gray-400"]
              })
            ]),
            createElement('div', {}, [
              createElement('div', {
                class: ["font-medium"]
              }, [`${contact.prenom} ${contact.nom}`]),
              createElement('div', {
                class: ["text-sm", "text-gray-500"]
              }, [contact.telephone])
            ])
          ])
        ))
    ]);
  }

  createPopupHeader(title) {
    return createElement('div', {
      class: ["px-4", "py-3", "border-b", "border-gray-200", 
              "flex", "justify-between", "items-center"]
    }, [
      createElement('h3', {
        class: ["text-lg", "font-semibold"]
      }, [title]),
      createElement('button', {
        class: ["text-gray-400", "hover:text-gray-600"],
        onClick: () => {
          document.getElementById('add-member-popup')?.remove();
        }
      }, [
        createElement('i', {
          class: ["fas", "fa-times"]
        })
      ])
    ]);
  }
}

export const conversationMenuManager = new ConversationMenuManager();