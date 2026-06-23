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
                    display: none;
                    justify-content: center;
                    align-items: center;
                    list-style: none;
                    gap: var(--gap, 3rem);
                }

                h1,
                h2,
                h3,
                h4,
                h5 {
                    padding: 0;
                    margin: 0;
                    font-weight: 100;
                    letter-spacing: .25rem;
                }

                .cta {
                    padding: var(--padding, .5rem 1rem);
                    background-color: var(--cta-color, ${this.mainColor});
                    border: none;
                    border-radius: var(--default-radius, .5rem);
                }

                #menu {
                    width: 3rem;
                    height: 4rem;
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
                }

                .left {
                    transform: translateX(100%);
                    background-color: var(--cta-color, ${this.mainColor});
                }
                .right {
                    transform: translateX(-100%);
                    background-color: var(--bg, hsl(0, 0%, 10%));
                }

                @media screen and (min-width: 1160px) {
                    :host {
                        padding: var(--padding, 0 15rem);
                    }
                    .sections {
                        display: flex;
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
                <h2 id="logo">Patolinodd</h2>
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

        if (this.isOpened) {
            left.animate(
                {
                    transform: ['translateX(0)'],
                    opacity: [0.5]
                },
                {
                    duration: 333, fill: 'forwards', easing: 'ease-out'
                }
            );
            right.animate(
                {
                    transform: ['translateX(0)'],
                    opacity: [1]
                },
                {
                    duration: 333, fill: 'forwards', easing: 'ease-out', delay: 200
                }
            );
        } else {
            left.animate(
                {
                    transform: ['translateX(100%)'],
                    opacity: [0.5]
                },
                {
                    duration: 333, fill: 'forwards', easing: 'ease-out', delay: 200
                }
            );
            right.animate(
                {
                    transform: ['translateX(-100%)'],
                    opacity: [1]
                },
                {
                    duration: 333, fill: 'forwards', easing: 'ease-out'
                }
            );
        }
    }
}

customElements.define('pato-header', PatoHeaderComponent);