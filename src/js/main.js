import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';
import './modules/students-modal';

import {
  fetchTrendingMovies,
  fetchMoviesBySearchQuery,
  fetchMovieById,
} from './modules/fetchItems';
import { renderMovies, renderModal } from './modules/renderItems';
import { setQueued, setWatched } from './modules/myLibraryHandlers';
import { openMovieModal } from './modules/movieModalHandlers';

const perPage = 9;
const imgSize = 'w342';
const galleryDOM = document.querySelector('.main-content__list');
const searchForm = document.querySelector('.header__form');

window.addEventListener('load', async event => {
  event.preventDefault();
  try {
    const movies = await fetchTrendingMovies(1);
    await renderMovies(galleryDOM, perPage, imgSize, movies.results);
  } catch (error) {
    console.log(error.message);
  }
});

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const query = searchForm.search.value.trim();
  try {
    const movies = await fetchMoviesBySearchQuery(query, 1);
    await renderMovies(galleryDOM, perPage, imgSize, movies.results);
  } catch (error) {
    console.log(error.message);
  }
});

galleryDOM.addEventListener('click', async e => {
  if (e.currentTarget.nodeName !== 'LI') {
    return;
  }

  const modalDOM = document.querySelector('.movie-modal-backdrop');
  const movieID = e.currentTarget.dataset.movieID;
  const movieObject = await fetchMovieById(movieID);
  await renderModal(modalDOM, movieObject);
  await openMovieModal(movieID);
});
