class PatoHeaderComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.mainColor = 'hsl(36, 100%, 50%)';
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }
                :host {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: var(--header-height, 5rem);
                    padding: var(--page-padding, 1rem 1rem);
                    border: none;
                    border-bottom: var(--border, 2px solid hsl(60, 70%, 50%));
                    background-color:  var(--bg, hsl(0, 0%, 10%));
                }

                .sections,
                ::slotted(.sections),
                ::slotted(ul) {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    list-style: none;
                    gap: var(--gap, 3rem);
                    margin-top: var(--header-height, 5rem);
                }

                li,
                ::slotted(li) {
                    border-bottom: var(--border, 1px solid hsl(0, 0%, 40%));
                    cursor: pointer;
                    margin: 0;
                    padding: 0 ;
                }
                
                #sections {
                    display: none;
                }

                h1,
                h2,
                h3,
                h4,
                h5,
                ::slotted(h1),
                ::slotted(h2),
                ::slotted(h3),
                ::slotted(h4),
                ::slotted(h5) {
                    padding: 0;
                    margin: 0;
                    font-weight: 400;
                    color: var(--primary-color, hsl(0, 0%, 95%));
                }

                .cta,
                ::slotted(.cta),
                ::slotted(button) {
                    position: fixed;
                    bottom: 1rem;
                    right: 1rem;
                    padding: var(--padding, 1rem 2rem);
                    background-color: var(--cta-color, ${this.mainColor});
                    border: none;
                    border-radius: var(--default-radius, 50%);
                    width: 5rem;
                    height: 5rem;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    text-align: center;
                    z-index: 999;
                }

                #menu {
                    width: 3rem;
                    height: 3rem;
                    background-color: red;
                }
                
                .left,
                .right {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100vw;
                    will-change: transform;
                    transition: all 333ms ease-out;
                }

                .left {
                    transform: translateX(100%);
                    background-color: var(--cta-color, ${this.mainColor});
                    opacity: .72;
                }
                .right {
                    transform: translateX(-100%);
                    background-color: var(--bg, hsl(0, 0%, 10%));
                }

                @media (min-width: 500px) {
                    .cta,
                    ::slotted(.cta),
                    ::slotted(button) {
                        position: static;
                        border-radius: var(--border-radius, .5rem);
                        padding: .25rem .5rem;
                        min-width: 30%;
                        max-width: 70%;
                        height: auto;
                        z-index: 0;
                    }
                }

                @media (min-width: 700px){
                    :host {   
                        padding: var(--page-padding, 0 3rem);
                    }
                }

                @media (min-width: 1024px){
                    :host {
                        padding: var(--page-padding, 0 9rem);
                        display: grid;
                        grid-template-columns: auto 1fr auto;
                        align-items: center;
                    }
                    #sections {
                        display: block;
                    }

                    .sections,
                    ::slotted(.sections),
                    ::slotted(ul) {
                        gap: 0rem;
                        flex-direction: row;
                        justify-content: space-evenly;
                        align-items: center;
                        padding: 0;
                        margin: 0;
                        width: auto;
                    }
                    li,
                    ::slotted(li) {
                        border: none;
                    }

                    #menu {
                        display: none;
                    }
                    
                    .left, 
                    .right {
                        display: none;
                    }

                    .cta,
                    ::slotted(.cta),
                    ::slotted(button) {
                        position: static;
                        border-radius: var(--border-radius, .5rem);
                        min-width: 9rem;
                        height: auto;
                    }
                }

                @media (min-width: 1160px) {
                    :host {
                        padding: var(--page-padding, 0 15rem);
                    }
                    #sections {
                        display: block;
                    }

                    .sections,
                    ::slotted(.sections),
                    ::slotted(ul) {
                        flex-direction: row;
                        margin: 0;
                    }
                    li,
                    ::slotted(li) {
                        border: none;
                    }

                    #menu {
                        display: none;
                    }
                    
                    .left, 
                    .right {
                        display: none;
                    }
                }
            </style>
            <slot name="logo">
                <h2 id="logo">O</h2>
            </slot>
            <slot name="sections" id="sections">
                <ul class="sections">
                    <li>
                        <h3>Home</h3>
                    </li>
                    <li>
                        <h3>About</h3>
                    </li>
                    <li>
                        <h3>Projects</h3>
                    </li>
                    <li>
                        <h3>Testmonials</h3>
                    </li>
                </ul>
            </slot>
            <slot name="cta" id="cta">
                <button class="cta">
                    <h3>Contact Me</h3>
                </button>
            </slot>
            <slot name="menu" id="menu">
                <div class="menu"></div>
            </slot>
            <div class="left"></div>
            <div class="right"></div>
        `;

        this.startAnimationBind = this.startAnimation.bind(this);
        this.menu = this.shadowRoot.querySelector('slot#menu');

        this.sections = this.shadowRoot.querySelector("slot#sections");
        const sectionNodes = this.sections.assignedElements({ flatten: true });
        const sectionClone = sectionNodes[0].cloneNode(true);

        this.right = this.shadowRoot.querySelector('.right');
        sectionClone.classList.add("sections");
        this.right.appendChild(sectionClone);

        this.isOpened = false;
    }

    connectedCallback() {
        this.menu.addEventListener('click', this.startAnimationBind);

        const nodes = this.menu.assignedElements({ flatten: true });
        for (const el of nodes) {
            el.style.zIndex = 999;
        }
    }

    disconnectedCallback() {
        this.menu.removeEventListener('click', this.startAnimationBind);
    }

    startAnimation() {
        this.isOpened = !this.isOpened;
        const left = this.shadowRoot.querySelector('div.left');
        const right = this.shadowRoot.querySelector('div.right');
        let rAnimation = null;
        let lAnimation = null;

        if (this.isOpened) {
            right.style.transform = "translateX(0)";
            left.style.transform = "translateX(0)";
        } else {
            right.style.transform = "translateX(-100%)";
            left.style.transform = "translateX(100%)";
        }
    }
}

customElements.define('pato-header', PatoHeaderComponent);