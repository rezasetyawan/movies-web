class SearchBar extends HTMLElement {
    constructor() {
      super()
      this._shadowDOM = this.attachShadow({mode: 'open'});
  }
      connectedCallback() {
        this.render();
      }
      
      set clickEvent(event) {
        this._clickEvent = event;
        this.render();
      }
     
      get value() {
        return this._shadowDOM.querySelector('#searchElement').value;
      }
     
      render() {
        this._shadowDOM.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

        * {
            font-family: 'Poppins', sans-serif;
        }

        .search-container {
            width: 50%;
            margin: 12px auto;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 10px;
            border-radius: 5px;
            display: flex;
            position: relative;
            top: 5px;
            background-color: white;
            justify-content: center;
        }

        .search-container>input {
            width: 75%;
            padding: 10px;
            border: 0;
            border-bottom: 1px solid #1A1A40;
            font-weight: bold;
        }

        .search-container>button {
            width: 23%;
            cursor: pointer;
            margin-left: auto;
            padding: 10px;
            background-color: #1A1A40;
            color: white;
            border: 0;
            text-transform: uppercase;
            border-radius: 5px;
        }

        @media only screen and (min-width: 200px ) {
          .search-container {
            width: 80%;
            font-size: 0.5em;
            padding: 5px;
        }
        }

        @media only screen and (min-width: 320px) {
            .search-container {
                width: 75%;
                font-size: 0.7em;
            }

        }

        @media only screen and (min-width: 480px) {
            .search-container {
                width: 70%;
                font-size: 0.7em;
            }

            @media only screen and (min-width: 768px) {
                .search-container {
                  width: 50%;
                  font-size: 1em;

                }

                @media only screen and (max-width: 1024px) {
                    .search-container {
                      width: 70%;
                      font-size: 1.1em;

                    }
    </style>
    <div id="search-container" class="search-container">
      <input placeholder="Search movie" id="searchElement" type="search">
      <button id="searchButtonElement" type="submit">Search</button>
    </div>
`;
     
        this._shadowDOM.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
      }
    }
     
customElements.define('search-bar', SearchBar);