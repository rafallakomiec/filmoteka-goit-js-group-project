import { changeGenresIdToName } from './changeGenresIdToName';

import { fetchTrendingMovies } from './fetchItems';

export const renderMovies = async function (movies) {
  const results = movies.results;
  let moviesHTML = await Promise.all(
    results.map(async item => {
      let { genre_ids, title, poster_path, vote_average, release_date, id } = item;

      const genresNames = await changeGenresIdToName(genre_ids);

      return `<li data-movieID="${id}" class="movie-item">
    <img class="movie-item__poster" src="https://image.tmdb.org/t/p/w500/${poster_path}"/>
    <div class="movie-item__details">
      <h2 class="movie-item__title">${title}</h2>
      <span class="movie-item__genre">${genresNames.join(', ')}</span>
      <span class="movie-item__line">|</span>
      <span class="movie-item__year">Year: ${release_date}</span>
      <span class="movie-item__rating">${vote_average}</span>
    </div>
  </li>`;
    })
  );
  moviesHTML = moviesHTML.join(' ');
  const moviesWrapper = document.querySelector('.main-content__list');
  moviesWrapper.innerHTML = moviesHTML;
};
