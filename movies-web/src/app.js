import './script/component/app-bar.js';
import './script/component/search-bar.js';

const imgUrl = 'https://image.tmdb.org/t/p/w500';
const api_key = 'api_key=9d9341b9be6159be8bf5e70ab6d8fc93';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${api_key}`;
const movieList = document.querySelector('movie-list');
const mainContainer = document.querySelector('main');
mainContainer.innerHTML += `
<style>
  @import './styles/movie-list.css'
</style>
`;

const getMovies = (url) => {
  console.log(url)
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      if(responseJson.results.length !== 0) {
        renderAllMovie(responseJson.results)
      } else {
        movieList.innerHTML += `<h2 class="error-message">Sorry,we can't find that movie</h2>`
      }
    })
    .catch(() => {
      movieList.innerHTML += `<h2 class="error-message">Sorry,something went wrong ...</h2>`
    })
};

const renderAllMovie = (data) => {
  data.forEach(movie => {
    const { title, poster_path, vote_average, id } = movie;
    const imageLink = `${imgUrl}${poster_path}`;

    movieList.innerHTML += `
        <style>
           @import './styles/movie-item.css'
        </style>

        <div class="movie-item">
          <img src="${poster_path ? imageLink : 'https://via.placeholder.com/500x750'}" alt="${title} poster">
          <div class="score">⭐ ${vote_average}</div>
          <button class="detail-button" id="${id}">See detail</button>
        </div> 
    `;
    mainContainer.appendChild(movieList);
    
    document.getElementById(id).addEventListener('click', () => {
    showMovieDetail(movie);
   })
  });
};

const showMovieDetail = (movie) => {
  const movieDetail = document.createElement('div');
  movieDetail.classList.add('movie-detail');
  const imageLink = `${imgUrl}${movie.poster_path}`;

  movieDetail.innerHTML += `
  <style>
  @import './styles/movie-detail.css'
  </style>

  <div class="detail-container">
           <div class="detail-content">
            <div class="detail-img">
                <img src="${movie.poster_path ? imageLink : 'https://via.placeholder.com/500x750'}" alt="${movie.title} poster">
            </div>
            <div class="detail info">
                <h2>${movie.title}</h2>
                <span class="close">&times;</span>
                <table class=".movie-table-info">
                    <tr>
                        <th>Release Date:</th>
                        <td>${movie.release_date}</td>
                    </tr> 
                    <tr>
                        <th>TMDB Score</th>
                        <td>${movie.vote_average}/10 from ${movie.vote_count} users </td>
                    </tr>
                    <tr>
                        <th>Popularity</th>
                        <td>${movie.popularity}</td>
                    </tr>
                   </table>
                   <div class="overview">
                    ${movie.overview}
                   </div>
            </div>
           </div>
        </div>
   `;
  mainContainer.appendChild(movieDetail);
}

// SEARCH MOVIES
const searchInput = document.getElementById('searchElement');
const form = document.getElementById('search-container');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchValue = searchInput.value;

  if (searchValue) {
    movieList.innerHTML = '';
 
    let url = `https://api.themoviedb.org/3/search/movie?${api_key}&query=${searchValue}`;
    getMovies(url);
  } else {
    movieList.innerHTML = '';
   
    getMovies(apiUrl);
  }
});
//

document.addEventListener('DOMContentLoaded',() => {
  getMovies(apiUrl)
})














