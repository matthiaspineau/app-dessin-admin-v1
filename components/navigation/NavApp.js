import { routes } from "./../../routes.js";

const app = document.getElementById("app");
class NavApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    let content = "";

    routes.forEach((eltlink) => {
      content += this.createLink(eltlink);
    });

    shadow.innerHTML = `<ul class="nav-app">
                        ${content}
                    </ul>
                    ${this.getStyle()}
        `;
  }

  getStyle() {
    let style = `<style>
                .nav-app {
                    display: flex; 
                    padding: 0;
                    list-style: none;
                    margin: 0;
                }
                .nav-app a {
                    padding-left: 10px;
                    padding-right: 10px;
                    color: #fff;
                    text-decoration:none; 
                }
            </style>`;

    return style;
  }

  createLink(info) {
    return `<li><a href="${info.link}">${info.desc}</a></li>`;
  }

  disconnectedCallback() {
    // le navigateur appelle cette méthode lorsque l'élément est supprimé du document
    // elle peut-être appelé autant de fois que lélément est ajouté ou supprimé)
  }

  static get observedAttributes() {
    return [
      /* tableau listant les attributs dont les changements sont à surveiller */
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // appelé lorsque l'un des attributs listé par la méthode ci-dessus est modifié
  }

  adoptedCallback() {
    // méthode appelé lorsque l'élément est envoyé vers un nouveau document
    // (utilisé très rarement avec document.adoptNode)
  }
}

customElements.define("nav-app", NavApp);
