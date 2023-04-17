import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';

import {fetchTrendingMovies,fetchMoviesBySearchQuery} from './modules/fetchItems';
fetchMoviesBySearchQuery('60')
fetchTrendingMovies();