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
  const genresNames =
    genres.length && Array.isArray(genres)
      ? genres.map(item => item.name).join(', ')
      : 'No genres available';
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
        https://image.tmdb.org/t/p/w500/${poster_path}   375w,
        https://image.tmdb.org/t/p/w500/${poster_path}   480w,
        https://image.tmdb.org/t/p/w780/${poster_path}   528w,
        https://image.tmdb.org/t/p/w780/${poster_path}   750w
        "
        sizes="(min-width: 1280px) 375px, (min-width: 768px) 264px, 240px"
      />
      <div class="modal__description">
        <h2 class="modal__title">${title ? title : 'No common title'}</h2>
        <div class="modal__properties">
          <div class="modal__property">
            <p class="modal__column modal__property-title">Vote / Votes</p>
            <p class="modal__column modal__property-value">
              <span class="modal__highlight">${
                vote_average.toFixed(1) > 0 ? vote_average.toFixed(1) : 0
              }</span> /
              <span class="modal__highlight-alt">${vote_count > 0 ? vote_count : 0}</span>
            </p>
          </div>
          <div class="modal__property">
            <span class="modal__column modal__property-title">Popularity</span>
            <span class="modal__column modal__property-value">${
              popularity.toFixed(1) > 0 ? popularity.toFixed(1) : 0
            }</span>
          </div>
          <div class="modal__property">
            <span class="modal__column modal__property-title">Original Title</span>
            <span class="modal__column modal__property-value">${
              original_title ? original_title.toUpperCase() : 'No original title'
            }</span>
          </div>
          <div class="modal__property">
            <span class="modal__column modal__property-title">Genre</span>
            <span class="modal__column modal__property-value">${genresNames}</span>
          </div>
          <div class="modal__about">
            <h3 class="modal__about-title">ABOUT</h3>
            <span class="modal__about-value">
              ${overview ? overview : 'No description available...'}
            </span>
          </div>          
        </div>
        <div class="modal__buttons">
          <button class="modal__btn modal__btn--to-watched">
            ADD TO WATCHED
          </button>
          <button class="modal__btn modal__btn--to-queue">
            ADD TO QUEUE
          </button>
        </div>
      </div>
`;
  DOM.innerHTML = modalContent;
};

export const renderMovies = async (DOM, perPage, movieObjectsArray) => {
  DOM.innerHTML = '';

  for (let i = 0; i < perPage; i += 1) {
    const { genre_names = [], title = '', original_title = '', poster_path = '', vote_average = 0, release_date = null, id = null} =
      movieObjectsArray[i];
   
    const html = `
      <li class="movie-item" data-movieid="${id}">
        <img class="movie-item__poster" 
        src="https://image.tmdb.org/t/p/original/${poster_path}"
        srcset="
        https://image.tmdb.org/t/p/w342/${poster_path}   280w,
        https://image.tmdb.org/t/p/w342/${poster_path}   336w,
        https://image.tmdb.org/t/p/w500/${poster_path}   395w,
        https://image.tmdb.org/t/p/w780/${poster_path}   560w,
        https://image.tmdb.org/t/p/w780/${poster_path}   672w,
        https://image.tmdb.org/t/p/w780/${poster_path}   790w
        "
        sizes="(min-width: 1280px) 395px, (min-width: 768px) 336px, 280px"
        />
        <div class="movie-item__details">
          <h2 class="movie-item__title">${
            title ? title : original_title ? original_title : 'No title available'
          }</h2>
          <span class="movie-item__genre">${
            genre_names.length && Array.isArray(genre_names)
              ? genre_names.join(', ')
              : 'No genres available'
          }</span>
          <span class="movie-item__line">|</span>
          <span class="movie-item__year">${
            release_date ? release_date.slice(0, 4) : 'No release year available'
          }</span>
          <span class="movie-item__rating">${
            vote_average.toFixed(1) > 0 ? vote_average.toFixed(1) : 0
          }</span>
        </div>
      </li>
      `;

    DOM.insertAdjacentHTML('beforeend', html);
  }
};
