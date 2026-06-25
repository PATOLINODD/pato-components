class PatoHeaderComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.mainColor = 'hsl(36, 100%, 50%)';
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: var(--height, 5rem);
                    padding: var(--padding, 1rem 1rem);
                    border: none;
                    border-bottom: var(--border, 2px solid hsl(60, 70%, 50%));
                }

                .sections {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    list-style: none;
                    gap: var(--gap, 3rem);
                    margin-top: 5rem;
                }

                li {
                    border-bottom: var(--border, 1px solid hsl(0, 0%, 40%));
                    width: 80%;
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
                h5 {
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
                    padding: var(--padding, .5rem 1rem);
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
                        padding: .5rem;
                        min-width: 30%;
                        max-width: 70%;
                        height: auto;
                        z-index: 0;
                    }
                }

                @media (min-width: 1160px) {
                    :host {
                        padding: var(--padding, 0 15rem);
                    }
                    #sections {
                        display: block;
                    }

                    .sections {
                        flex-direction: row;
                        margin: 0;
                    }
                    li {
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
                        padding: .5rem;
                        min-width: 20%;
                        max-width: 70%;
                        height: auto;
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
        console.log(sectionClone);
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