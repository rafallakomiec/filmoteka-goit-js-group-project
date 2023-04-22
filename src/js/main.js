import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';

import {
  fetchTrendingMovies,
  fetchMoviesBySearchQuery,
  fetchMovieById,
} from './modules/fetchItems';
import { renderMovies, renderModal } from './modules/renderItems';
import './modules/myLibraryHandlers';
import { openMovieModal } from './modules/movieModalHandlers';
import './modules/studentsModalHandlers';
import { fetchGenresList, changeGenresIdToName } from './utils/changeGenresIdToName';

const perPage = 9;
const imgSize = 'w342';
const galleryDOM = document.querySelector('.main-content__list');
const searchForm = document.querySelector('.header__form');
let query = '';
let genresDecodeArray = [];

const onSearchFormSubmit = async event => {
  event.preventDefault();
  query = searchForm.search.value.trim();

  try {
    const movies = await fetchMoviesBySearchQuery(query, 1);
    const readyMovies = movies.results.map(elem => {
      elem.genre_names = changeGenresIdToName(elem.genre_ids, genresDecodeArray);
      return elem;
    });
    galleryDOM.innerHTML = '';
    await renderMovies(galleryDOM, perPage, imgSize, readyMovies);
  } catch (error) {
    console.log(error.message);
  }
};

const onMovieCardSelection = async event => {
  if (event.currentTarget.nodeName !== 'LI') {
    return;
  }

  const modalDOM = document.querySelector('.movie-modal-backdrop');
  const movieID = event.currentTarget.dataset.movieID;
  const movieObject = await fetchMovieById(movieID);
  await renderModal(modalDOM, movieObject);
  await openMovieModal(movieID);
};

const onWindowLoad = async () => {
  try {
    const genresAPIResponse = await fetchGenresList();
    genresDecodeArray = genresAPIResponse;
    const movies = await fetchTrendingMovies(1);
    const readyMovies = movies.results.map(elem => {
      elem.genre_names = changeGenresIdToName(elem.genre_ids, genresDecodeArray);
      return elem;
    });
    await renderMovies(galleryDOM, perPage, imgSize, readyMovies);

    searchForm.addEventListener('submit', onSearchFormSubmit);
    galleryDOM.addEventListener('click', onMovieCardSelection);
  } catch (error) {
    console.log(error.message);
  }
};

window.addEventListener('load', onWindowLoad);
