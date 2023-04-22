import { changeGenresIdToName } from '../utils/changeGenresIdToName';

export const renderModal = async (DOM, movieObject) => {
  const {
    title,
    genres,
    vote_count,
    poster_path,
    vote_average,
    popularity,
    original_title,
    overview,
  } = movieObject;
  const genresNames = genres.map(item => item.name).join(', ');
  const modalContent = `
      <button class="modal__close-btn">
      <svg class="modal__close-btn-icon">
        <use href="./images/icons.svg#icon-close-btn"></use>
      </svg>
      </button>
      <img
        class="modal__poster"
        src="https://image.tmdb.org/t/p/original/${poster_path}"
        srcset="
        https://image.tmdb.org/t/p/w342/${poster_path}   240w,
        https://image.tmdb.org/t/p/w342/${poster_path}   264w,
        https://image.tmdb.org/t/p/w342/${poster_path}   375w,
        https://image.tmdb.org/t/p/w500/${poster_path}   480w,
        https://image.tmdb.org/t/p/w500/${poster_path}   528w,
        https://image.tmdb.org/t/p/w780/${poster_path}   750w
        "
        sizes="(min-width: 1280px) 375px, (min-width: 768px) 264px, 240px"
      />
      <div class="modal__description">
        <h2 class="modal__title">${title}</h2>
        <div class="modal__properties">
          <div class="modal__property">
            <p class="modal__column modal__property-title">Vote / Votes</p>
            <p class="modal__column modal__property-value">
              <span class="modal__highlight">${vote_average.toFixed(1)}</span> /
              <span class="modal__highlight-alt">${vote_count}</span>
            </p>
          </div>
          <div class="modal__property">
            <span class="modal__column modal__property-title">Popularity</span>
            <span class="modal__column modal__property-value">${popularity.toFixed(1)}</span>
          </div>
          <div class="modal__property">
            <span class="modal__column modal__property-title">Original Title</span>
            <span class="modal__column modal__property-value">${original_title.toUpperCase()}</span>
          </div>
          <div class="modal__property">
            <span class="modal__column modal__property-title">Genre</span>
            <span class="modal__column modal__property-value">${genresNames}</span>
          </div>
          <div class="modal__about">
            <h3 class="modal__about-title">ABOUT</h3>
            <span class="modal__about-value">
              ${overview}
            </span>
          </div>          
        </div>
      </div>
      <div class="modal__buttons">
        <button id="modal-button-watched" class="modal__btn modal__btn--to-watched">
          ADD TO WATCHED
        </button>
        <button id="modal-button-queue" class="modal__btn modal__btn--to-queue">
          ADD TO QUEUE
        </button>
      </div>
`;
  DOM.innerHTML = modalContent;
};

export const renderMovies = async (DOM, perPage, imgSize, movieObjectsArray) => {
  for (let i = 0; i < perPage; i += 1) {
    const { genre_ids, title, poster_path, vote_average, release_date, id } = movieObjectsArray[i];

    const genresNames = await changeGenresIdToName(genre_ids);

    const html = `
      <li class="movie-item" data-movieID="${id}">
        <img class="movie-item__poster" src="https://image.tmdb.org/t/p/${imgSize}/${poster_path}" />
        <div class="movie-item__details">
          <h2 class="movie-item__title">${title}</h2>
          <span class="movie-item__genre">${genresNames.join(', ')}</span>
          <span class="movie-item__line">|</span>
          <span class="movie-item__year">${
            release_date ? release_date.slice(0, 4) : 'no release year'
          }</span>
          <span class="movie-item__rating">${vote_average.toFixed(1)}</span>
        </div>
      </li>
      `;

    DOM.insertAdjacentHTML('beforeend', html);
  }
};
