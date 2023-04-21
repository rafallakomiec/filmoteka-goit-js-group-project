import { changeGenresIdToName } from './changeGenresIdToName';

import { openMovieModal } from './openMovieModal';
import { fetchMovieById } from './fetchItems';

const modal = document.querySelector(`[data-modal]`);
const renderModal = async movieId => {
  modal.classList.toggle('is-hidden');
  const movieDetails = await fetchMovieById(movieId);
  let {
    title,
    genres,
    vote_count,
    poster_path,
    vote_average,
    popularity,
    original_title,
    overview,
  } = movieDetails;
  const genresNames = genres.map(item => item.name).join(', ');
  const modalContentNode = document.querySelector('.modal__content');
  const modalContent = `<img
          id="modal-poster"
          class="modal__poster"
          src="https://image.tmdb.org/t/p/w500/${poster_path}"
        srcset="
        https://image.tmdb.org/t/p/w500/${poster_path}   240w,
        https://image.tmdb.org/t/p/w500/${poster_path}   264w,
        https://image.tmdb.org/t/p/w500/${poster_path}   375w
        "
          sizes="(min-width: 1280px) 375px, (min-width: 768px) 264px, 240px"
        />
        <div class="modal__description">
          <h2 id="modal-film-title" class="modal__title">${title}</h2>
          <div class="modal__properties">
            <div class="modal__property">
              <p class="modal__column modal__property-title">Vote / Votes</p>
              <p class="modal__column modal__property-value">
                <span id="modal-vote-average" class="modal__highlight">${vote_average.toFixed(
                  1,
                )}</span> /
                <!--vote average -->
                <span id="modal-votes-total" class="modal__highlight-alt">${vote_count}</span>
                <!-- total votes -->
              </p>
            </div>
            <div class="modal__property">
              <span class="modal__column modal__property-title">Popularity</span>
              <span id="modal-popularity" class="modal__column modal__property-value">${popularity.toFixed(
                1,
              )}</span>
            </div>
            <div class="modal__property">
              <span class="modal__column modal__property-title">Original Title</span>
              <span id="modal-original-title" class="modal__column modal__property-value"
                >${original_title.toUpperCase()}</span
              >
            </div>
            <div class="modal__property">
              <span class="modal__column modal__property-title">Genre</span>
              <span id="modal-genre" class="modal__column modal__property-value">${genresNames}</span>
            </div>
                      ${
                        overview &&
                        `<div class="modal__about">
              <h3 class="modal__about-title">ABOUT</h3>
              <span id="modal-about" class="modal__about-value">
              ${overview}
              </span>
            </div>`
                      }
          </div>
          <div class="modal__buttons">
            <button id="modal-button-watched" class="modal__btn modal__btn--to-watched">
              ADD TO WATCHED
            </button>
            <button id="modal-button-queue" class="modal__btn modal__btn--to-queue">
              ADD TO QUEUE
            </button>
          </div>
        </div>`;

  modalContentNode.innerHTML = modalContent;
};

export const renderMovies = async function (movies) {
  const results = movies.results;
  let moviesHTML = await Promise.all(
    results.map(async item => {
      let {
        genre_ids,
        original_title,
        poster_path,
        vote_average,
        release_date,
        id,
        original_name,
        first_air_date,
      } = item;

      const genresNames = await changeGenresIdToName(genre_ids);

      const handleClick = e => {
        const movie = e.currentTarget;
        const movieId = movie.getAttribute('data-movieID');

        renderModal(movieId);
      };

      const movieItem = document.createElement('li');

      movieItem.style.margin = '20px';
      movieItem.addEventListener('click', handleClick);
      movieItem.className = 'movie-item';
      movieItem.setAttribute('data-movieID', id);
      movieItem.innerHTML = `<img class="movie-item__poster" src="https://image.tmdb.org/t/p/w500/${poster_path}"/>
    <div class="movie-item__details">
      <h2 class="movie-item__title">${
        original_title === undefined ? original_name : original_title
      }</h2>
      <span class="movie-item__genre">${genresNames.join(', ')}</span>
      <span class="movie-item__line">|</span>
      <span class="movie-item__year">${(release_date
        ? release_date
        : first_air_date
        ? first_air_date
        : 'no-data'
      ).slice(0, 4)}</span>
      <span class="movie-item__rating">${vote_average.toFixed(1)}</span>
    </div>`;
      return movieItem;
    }),
  );
  const moviesWrapper = document.querySelector('.main-content__list');
  moviesWrapper.append(...moviesHTML);
};

const getDate = date => {
  return date && date.split('-')[0];
};
