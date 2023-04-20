import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';

import { openMovieModal } from './modules/openMovieModal.js';
import { fetchTrendingMovies, fetchMoviesBySearchQuery } from './modules/fetchItems';
import { renderMovies } from './modules/displayItems';
openMovieModal();
window.addEventListener('load', async event => {
  event.preventDefault();
  try {
    const movies = await fetchTrendingMovies(1);
    await renderMovies(movies);
  } catch (error) {
    console.log(error.message);
  }
});

const searchInput = document.querySelector('.header__form-input');
const searchButton = document.querySelector('.header__form-btn');

searchButton.addEventListener('click', async e => {
  e.preventDefault();
  const movieTitle = searchInput.value.trim();
  try {
    const movies = await fetchMoviesBySearchQuery(movieTitle, 1);
    await renderMovies(movies);
  } catch (error) {
    console.log(error.message);
  }
});


