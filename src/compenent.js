/*Créer un élément HTML (div, span, etc.) avec des propriétés (props) et un contenu (content), en supportant :

vIf (affichage conditionnel)

vFor (boucle sur des données)

Liaison dynamique :attr

Gestion d’événements

Application de styles et classes

Contenu statique ou dynamique

Chaînage avec .addElement et .addNode
*/

/**
 * 
 * @param {*} tag 
 * @param {*} props 
 * @param {*} content 
 * @returns 
 */

export function createElement(tag, props = {}, content = "") {
/*
Déclaration de la fonction exportable createElement, avec 3 paramètres :

tag : nom de la balise (div, button, h1, etc.)

props : un objet avec les propriétés, attributs et directives

content : contenu de l’élément (texte, enfants, fragment, etc.)
*/
    
    //Vérifie que le tag est bien une chaîne. Si ce n’est pas le cas, retourne null.
    if (typeof tag !== "string") return null;

    // Gestion de v-if
    //Si vIf est défini dans props et est falsy, on ne crée pas l’élément. Cela simule le comportement de v-if dans Vue.
    if ('vIf' in props && !props.vIf) return null;


    // Gestion de v-for (retourne un fragment)
/*Si vFor est présent, on prépare un fragment vide (conteneur DOM virtuel).
On extrait each (le tableau à boucler) et render (fonction de rendu pour chaque item).
*/
    if ('vFor' in props) {
        const fragment = document.createDocumentFragment();
        const { each, render } = props.vFor;
        
        console.log(render)

/*Pour chaque item de each, on appelle render(item) → cela doit retourner un nœud DOM.
On les ajoute tous dans le fragment. Ensuite, on met ce fragment comme content.
*/       each.forEach((item) => {
            const child = render(item );
            if (child instanceof Node) {
                fragment.appendChild(child);
            }
        });
        content = fragment;
    }
//On crée l’élément HTML à partir du nom de balise (div, ul, etc.).
    const el = document.createElement(tag);


    //Boucle sur toutes les clés de props.
    for (const key in props) {
        const value = props[key];

        // Classes

/*Si la clé est class ou className, on l’assigne à el.className.
Si c’est un tableau (ex: ["btn", "active"]), on le transforme en string "btn active".
*/
        if (key === "class" || key === "className") {
            el.className = Array.isArray(value) ? value.join(" ") : value;
        }

        // Événements

        /*Si la clé commence par on (ex: onClick, onMouseOver), on extrait le nom de l'événement (click, mouseover) et on ajoute l'écouteur d’événement avec addEventListener.
        */
        else if (key.startsWith("on") && typeof value === "function") {
            const eventName = key.slice(2).toLowerCase();
            el.addEventListener(eventName, value);
        }

        // v-show => toggle `display: none`
        // Simule v-show de Vue : si vShow vaut false, on cache l’élément (display: none).
        else if (key === "vShow") {
            el.style.display = value ? "" : "none";
        }

        // vIf et vFor 
        //On ignore ici vIf et vFor car ils ont déjà été traités plus haut.
        else if (key === "vIf" || key === "vFor") {
            continue;
        }

        
        // :attr => dynamic binding
        //Si une clé commence par : (ex: :src, :id), on extrait le vrai nom (src, id) et on assigne dynamiquement sa valeur avec setAttribute.
        else if (key.startsWith(":")) {
            const realAttr = key.slice(1);
            el.setAttribute(realAttr, value);
        }

        // style objet
        //Si la clé est style et que sa valeur est un objet (ex: { color: "red" }), on applique chaque propriété CSS avec Object.assign.
        else if (key === "style" && typeof value === "object") {
            Object.assign(el.style, value);
        }

        // Attribut HTML classique
        //Sinon, on considère que c’est un attribut HTML classique (id, placeholder, type, etc.).
        else {
            el.setAttribute(key, value);
        }
    }

    // Contenu : string | Node | array
    /*Si le content est un tableau, on traite chaque élément :

Si c’est une chaîne → on ajoute un TextNode

Si c’est un Node (ex: div, span) → on l’ajoute directement
*/

    if (Array.isArray(content)) {
        content.forEach(item => {
            if (typeof item === "string") {
                el.appendChild(document.createTextNode(item));
            } else if (item instanceof Node) {
                el.appendChild(item);
            }
        });
    } else if (typeof content === "string"  || typeof content === "number") {
        el.textContent = content;
    } else if (content instanceof Node) {
        el.appendChild(content);
    }

    // Méthodes pour chaînage
    el.addElement = function (tag, props = {}, content = "") {
        const newEl = createElement(tag, props, content);
        this.appendChild(newEl);
        return this;
    };
    el.addNode = function (node) {
        this.appendChild(node);
        return this;
    };

    return el;
}
