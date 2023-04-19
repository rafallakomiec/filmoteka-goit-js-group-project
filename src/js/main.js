import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';

import { openMovieModal } from './modules/openMovieModal.js';
import { fetchTrendingMovies } from './modules/fetchItems';
import { renderMovies } from './modules/displayItems';

( async () => {
  const movies = await fetchTrendingMovies();
  renderMovies(movies);
})();

openMovieModal();