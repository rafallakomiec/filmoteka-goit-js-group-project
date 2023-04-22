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
const genresDecodeArray = [];

const onSearchFormSubmit = async event => {
  event.preventDefault();
  query = searchForm.search.value.trim();

  try {
    const movies = await fetchMoviesBySearchQuery(query, 1);
    movies.results.genre_names = changeGenresIdToName(movies.results.genre_ids, genresDecodeArray);
    await renderMovies(galleryDOM, perPage, imgSize, movies.results);
  } catch (error) {
    console.log(error.message);
  }
};

const onMovieCardSelection = async event => {
  if (e.currentTarget.nodeName !== 'LI') {
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
    movies.results.genre_names = changeGenresIdToName(movies.results.genre_ids, genresDecodeArray);
    await renderMovies(galleryDOM, perPage, imgSize, movies.results);

    searchForm.addEventListener('submit', onSearchFormSubmit);
    galleryDOM.addEventListener('click', onMovieCardSelection);
  } catch (error) {
    console.log(error.message);
  }
};

window.addEventListener('load', onWindowLoad);
