import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';

import { fetchTrendingMovies } from './fetchItems';
import { renderMovies } from './modules/displayItems';

const movies = fetchTrendingMovies();
renderMovies(movies);

