class Loader extends HTMLElement {
    constructor() {
        super();
        this._shadowDOM = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowDOM.innerHTML = `
      <style>
      .loader-container {
        margin: 180px auto;
      }
      .loader {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #1A1A40; 
        border-radius: 50%;
        width: 45px;
        height: 45px;
        margin: 0 auto;
        animation: spin 2s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      </style>

      <div class="loader-container">
        <div class="loader"></div>
      </div>
        `;
    }
};

customElements.define('loading-animation', Loader);
