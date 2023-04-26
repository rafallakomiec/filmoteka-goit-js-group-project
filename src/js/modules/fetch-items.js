import axios from 'axios';
import { Notify } from 'notiflix';

const API_KEY = 'api_key=1c8f6b064eb2a1f6bd306bc5a0f759ec';
const API_URL = 'https://api.themoviedb.org/3/';
const API_LANGUAGE = 'language=en-US';
const GENRE_MOVIE_LIST_URL = '/genre/movie/list';
const GENRE_TV_LIST_URL = '/genre/tv/list';

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await axios.get(
      `${API_URL}trending/all/day?${API_KEY}&page=${page}${API_LANGUAGE}`
    );
    if (response.status !== 200 || response.data == null) {
      throw new Error('Failed fetching today trending movies... Reload the site to try again.');
    }
    return response.data; // => {page, results, total_pages, total_results}
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const fetchMoviesBySearchQuery = async (searchQuery, page = 1) => {
  try {
    const response = await axios.get(
      `${API_URL}search/movie?${API_KEY}&${API_LANGUAGE}&page=${page}&query=${searchQuery}`
    );

    if (response.status !== 200) {
      throw new Error('Please try again... Failed communication with server.');
    }
    if (response.data.results.length > 0) {
      return response.data; // => {page, results, total_pages, total_results}
    } else {
      Notify.failure(`${searchQuery} doesn't exist. Try searching otherwise...`, {
        position: 'center-top',
      });
      return null;
    }
  } catch (error) {
    console.error(error.message);
    Notify.failure(error.message);
    return null;
  }
};

export const fetchMovieById = async movieId => {
  try {
    const response = await axios.get(`${API_URL}movie/${movieId}?${API_KEY}&${API_LANGUAGE}`);
    if (
      response.status !== 200 ||
      response.data == null ||
      response.data.first_air_date ||
      response.data.name ||
      response.data.original_name
    ) {
      throw new Error('Failed fetching movie data... Please try again.');
    }
    return response.data;
  } catch (error) {
    try {
      const response = await axios.get(`${API_URL}tv/${movieId}?${API_KEY}&${API_LANGUAGE}`);
      if (response.status !== 200 || response.data == null) {
        throw new Error('Failed fetching movie data... Please try again.');
      }
      return response.data;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
};

export const fetchAllGenresList = async () => {
  const responseGenresMovie = await fetch(
    `${API_URL}${GENRE_MOVIE_LIST_URL}${API_KEY}&language=en-US`
  );

  const responseGenresTV = await fetch(`${BASE_URL}${GENRE_TV_LIST_URL}${API_KEY}&language=en-US`);

  const genresMovieList = await responseGenresMovie.json();
  const genresTVList = await responseGenresTV.json();

  const allGenresList = [
    ...new Map(
      [...genresMovieList.genres, ...genresTVList.genres].map(genre => [genre['id'], genre])
    ).values(),
  ];
  allGenresListMain = allGenresList;
  return allGenresList;
};
