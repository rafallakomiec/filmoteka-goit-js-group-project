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

const searchForm = document.querySelector('.header__form');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const movieTitle = searchInput.value.trim();
  try {
    const movies = await fetchMoviesBySearchQuery(movieTitle, 1);
    await renderMovies(movies);
  } catch (error) {
    console.log(error.message);
  }
});


