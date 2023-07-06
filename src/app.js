import './script/component/app-bar.js';
import './script/component/loader.js';
import style from './styles/style.css';
import $ from 'jquery';

const imgUrl = 'https://image.tmdb.org/t/p/w500';
const api_key = 'api_key=9d9341b9be6159be8bf5e70ab6d8fc93';
let apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${api_key}`;
let lastUrl;

const movieList = $('#movie-list');
const mainContainer = $('#main');

const getMovies = (url) => {
  lastUrl = url;
  $.ajax({
    url: url,
    success:(response) => {
     if(response) {
      if(response.results.length !== 0) {
        renderAllMovie(response.results);
      } else {
        $('footer').attr('class','not-found');
        movieList.html(`<h2 class="error-message">Sorry,we can't your movie (error 404)</h2>`);
      };
     };
    },
   error:() => {
    movieList.html(`<h2 class="error-message">Sorry,something went wrong ...</h2>`)
   },
  });
};

$(document).on({
  ajaxStart: () => {
    console.log('start');
    mainContainer.append('<loading-animation></loading-animation>');
  },
   ajaxStop: () => {
    console.log('end');
    $('loading-animation').remove();
   },
});
  
const renderAllMovie = (data) => {
  data.reverse().forEach(movie => {
    const { title, poster_path, vote_average, id } = movie;
    const imageLink = `${imgUrl}${poster_path}`;

    movieList.prepend(`<div id="movie-item">`);
    const movieItem = $('#movie-item');
    movieItem.addClass('movie-item');

    movieItem.html(`
    <img src="${poster_path ? imageLink : 'https://via.placeholder.com/500x750'}" alt="${title} poster">
    <div class="score">⭐ ${vote_average}</div>
    <button class="detail-button" id="${id}">See detail</button>`);

    mainContainer.append(movieList);
    $('#'+id).on('click',() => {
    getMoviesDetailById(id);
    });
  });
};

// MOVIE DETAIL
const getMoviesDetailById = (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?${api_key}`;
  $.ajax({
    url: url,
    success: (response) => {
      if(response) {
        showMovieDetail(response)
       }
    },
    error: () => {
      movieList.append( `<h2 class="error-message">Sorry,something went wrong ...</h2>`);
    }
  });
};

const showMovieDetail = (data) => {
  const movie = data;
  movie.budget = thousandsSeparator(movie.budget);
  movieList.prepend(`<div id="movie-detail">`);
  const movieDetail = $('#movie-detail')
  movieDetail.addClass('movie-item');
  const imageLink = `${imgUrl}${movie.poster_path}`;

  movieDetail.append(`

  <div class="detail-container" id="detail-container">
           <div class="detail-content">
            <div class="detail-img">
                <img src="${movie.poster_path ? imageLink : 'https://via.placeholder.com/500x750'}" alt="${movie.title} poster">
            </div>
            <div class="detail-info">
                <h2>${movie.title}</h2>
                <span class="close">&times;</span>
                <table class=".movie-table-info">
                    <tr>
                        <th>Release Date</th>
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
                    <tr>
                        <th>Languange</th>
                        <td>${movie.original_language}</td>
                    </tr>
                    <tr>
                        <th>Budget</th>
                        <td>$${movie.budget}</td>
                    </tr>
                    <tr>
                        <th>Genres</th>
                        <td>
                        ${movie.genres.map(genre => `<span>${genre.name}</span>`).join(',')}
                        </td>
                    </tr>
                   </table>
                   <p class="overview">
                    ${movie.overview}
                   </p>
            </div>
           </div>
        </div>
   `);
   
  mainContainer.append(movieDetail);
  $('#detail-container').css('background',`linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, 1)),url(${imageLink})`); 

  $('.close').on('click',() => {
    $('#movie-detail').remove();
  });

  $(window).on('click',() => {
    $('#movie-detail').remove();
  });
};
//

// SEARCH MOVIES
const searchInput = document.getElementById('searchElement');
const form = document.getElementById('search-container');

form.addEventListener('submit',(event) => {
  event.preventDefault();
  const searchValue = searchInput.value;

  if (searchValue) {
    movieList.html('');
    currentPageDisplay.innerText = 1;
    currentPage = 1;
    let url = `https://api.themoviedb.org/3/search/movie?${api_key}&query=${searchValue}`;
    getMovies(url);
  } else {
    movieList.html('');
    currentPageDisplay.innerText = 1;
    currentPage = 1;
    getMovies(apiUrl);
  }
});
//

// PAGINATION
const currentPageDisplay = document.getElementById('page');
let currentPage = currentPageDisplay.innerText;
const totalPage = 100;

document.getElementById('prev').addEventListener('click',() => {
  if(currentPage > 1) {
    currentPage--;
    changePage(currentPage);
  };
});

document.getElementById('next').addEventListener('click',() => {
  if(currentPage < totalPage) {
    currentPage++;
    changePage(currentPage);
  };
});

const changePage = (page) => {
  movieList.html('');
  currentPageDisplay.innerText = page;
  getMovies(`${lastUrl}&page=${page}`);
};
//

// THOUSANDS SEPARTOR FOR MOVIE BUDGET IN MOVIE DETAIL
const thousandsSeparator = (num) => {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

document.addEventListener('DOMContentLoaded',() => {
  getMovies(apiUrl);
});