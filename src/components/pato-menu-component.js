class PatoMenuComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                    width: 3rem;
                    padding: .25rem 0;
                }

                div {
                    width: 100%;
                    height: .25rem;
                    background-color: var(--secondary-color, hsl(0, 0%, 70%));
                    will-change: transform, opacity;
                    transform-origin: left;
                }

            </style>
            <div class="top"></div>
            <div class="mid"></div>
            <div class="bottom"></div>
        `;

        this.top = this.shadowRoot.querySelector('div.top');
        this.mid = this.shadowRoot.querySelector('div.mid');
        this.bottom = this.shadowRoot.querySelector('div.bottom');

        this.isOpened = false;
    }

    connectedCallback() {
        this.addEventListener('click', this.transform.bind(this));
    }

    transform() {
        this.top.animate(
            {
                transform: ['translateX(.4rem) rotate(45deg)'],
            },
            {
                duration: 333, fill: 'forwards', easing: 'ease-out'
            }
        );

        this.mid.animate(
            {
                opacity: [0]
            },
            {
                duration: 333, fill: 'forwards', easing: 'ease-out'
            }
        );

        this.bottom.animate(
            {
                transform: ['translateX(.4rem) rotate(-45deg)'],
            },
            {
                duration: 333, fill: 'forwards', easing: 'ease-out'
            }
        );
    }
}

customElements.define('pato-menu', PatoMenuComponent);