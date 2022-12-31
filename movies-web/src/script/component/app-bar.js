class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowDOM = this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    this.render();
  }
  
  render() {
    this._shadowDOM.innerHTML =`
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          :host {
            display: block;
            width: 100%;
            background-color: #1A1A40;
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          }
          h1 {
            padding: 16px;
            font-size: 1.3em;
            font-family: 'Poppins', sans-serif;
          }
        </style>
        
        <h1>Your Movies</h1>
      `;
  }
};

customElements.define('app-bar', AppBar);
