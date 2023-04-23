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
import { Notify } from 'notiflix';
import { generatePagination } from './modules/generatePagination';

let perPage = 20;
let sitePage = 1;
let APIPage = 1;
let totalResults = 0;
const galleryDOM = document.querySelector('.main-content__list');
const searchForm = document.querySelector('.header__form');
let query = '';
let genresDecodeArray = [];
const configNotiflix = {
  position: `center-top`,
};

const onSearchFormSubmit = async event => {
  event.preventDefault();
  query = searchForm.search.value.trim();
  const errorCaption = document.querySelector('.header__form-error-txt');
  errorCaption.classList.add('.header__form-error-txt--hidden');

  try {
    if (genresDecodeArray.length == 0) {
      throw new Error('Missing essential API data... Please refresh the site.');
    }
    if (query.length == 0) {
      errorCaption.classList.remove('.header__form-error-txt--hidden');
      throw new Error('Please enter meaningful query...');
    }

    const movies = await fetchMoviesBySearchQuery(query, 1);
    if (movies === null) {
      errorCaption.classList.remove('.header__form-error-txt--hidden');
      return;
    }
    const readyMovies = movies.results.map(elem => {
      elem.genre_names = changeGenresIdToName(elem.genre_ids, genresDecodeArray);
      return elem;
    });

    galleryDOM.innerHTML = '';
    await renderMovies(galleryDOM, perPage, readyMovies);
  } catch (error) {
    Notify.failure(error.message, configNotiflix);
  }
};

const onMovieCardSelection = async event => {
  const targetLI = event.target.closest('li[data-movieid]');

  const modalDOM = document.querySelector('modal__container');
  const movieID = targetLI.dataset.movieid;
  const movieObject = await fetchMovieById(movieID);

  if (movieObject instanceof Error) {
    Notify.failure(movieObject.message, configNotiflix);
    return;
  }

  await renderModal(modalDOM, movieObject);
  await openMovieModal(movieID);
};

const onWindowLoad = async () => {
  try {
    const genresAPIResponse = await fetchGenresList();
    if (genresAPIResponse == null) {
      throw new Error('Failed loading essential API data. Please reload the site in a moment...');
    }
    genresDecodeArray = genresAPIResponse;

    searchForm.addEventListener('submit', onSearchFormSubmit);
    galleryDOM.addEventListener('click', onMovieCardSelection);

    const movies = await fetchTrendingMovies(1);
    if (movies.results == null) {
      throw new Error(
        'Failed fetching today trending movies... Please reload the site to try again.'
      );
    }
    totalResults = movies.total_results;

    const readyMovies = movies.results.map(elem => {
      elem.genre_names = changeGenresIdToName(elem.genre_ids, genresDecodeArray);
      return elem;
    });

    await renderMovies(galleryDOM, perPage, readyMovies);
    const pagination = await generatePagination(totalResults, perPage);
    pagination.on('afterMove', async event => {
      const currentPage = event.page;
      const movies = await fetchTrendingMovies(currentPage);
      if (movies.results == null) {
        throw new Error(
          'Failed fetching today trending movies... Please reload the site to try again.'
        );
      }
      const readyMovies = movies.results.map(elem => {
        if (elem.genre_ids == undefined) {
          return;
        }
        elem.genre_names = changeGenresIdToName(elem.genre_ids, genresDecodeArray);
        console.log(elem);
        return elem;
      });
  
      await renderMovies(galleryDOM, perPage, readyMovies);
    });
  } catch (error) {
    Notify.failure(error.message, configNotiflix);
  }
};

window.addEventListener('load', onWindowLoad);
