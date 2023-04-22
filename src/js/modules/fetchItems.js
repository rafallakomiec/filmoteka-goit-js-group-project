import axios from 'axios';
import { Notify } from 'notiflix';

const API_KEY = 'api_key=1c8f6b064eb2a1f6bd306bc5a0f759ec';
const API_URL = 'https://api.themoviedb.org/3/';
const API_LANGUAGE = 'language=en-US';

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const { data } = await axios.get(
      `${API_URL}trending/all/day?${API_KEY}&page=${page}${API_LANGUAGE}`
    );
    return data; // => {page, results, total_pages, total_results}
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchMoviesBySearchQuery = async (searchQuery, page = 1) => {
  try {
    const { data } = await axios.get(
      `${API_URL}search/movie?${API_KEY}&${API_LANGUAGE}&page=${page}&query=${searchQuery}`
    );
    if (data.results.length > 0) {
      return data; // => {page, results, total_pages, total_results}
    } else {
      Notify.failure(`${searchQuery} doesn't exist. Try searching otherwise...`, {
        position: `center-top`,
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchMovieById = async movieId => {
  try {
    const { data } = await axios.get(`${API_URL}movie/${movieId}?${API_KEY}&${API_LANGUAGE}`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
