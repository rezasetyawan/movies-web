import './club-item.js';
 
class MovieList extends HTMLElement {
  constructor() {
    super()
    this._shadowDOM = this.attachShadow({mode: 'open'});
}

  set movies(movies) {
    this._movies = movies;
    this.render();
  }
 
  renderError(error) {
    this._shadowDOM.innerHTML += `<h2 class="placeholder">${error}</h2>`;
  }
 
  render() {
    this._shadowDOM.innerHTML = '';
    this._movies.forEach(movie => {
      const movieItemElement = document.createElement('movie-item');
      this._shadowDOM.appendChild(movieItemElement);
    });
  }
}
 
customElements.define('movie-list', MovieList);