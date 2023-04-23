import axios from 'axios';
import { Notify } from 'notiflix';

const API_KEY = 'api_key=1c8f6b064eb2a1f6bd306bc5a0f759ec';
const API_URL = 'https://api.themoviedb.org/3/';
const API_LANGUAGE = 'language=en-US';

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
    const data = await axios.get(
      `${API_URL}search/movie?${API_KEY}&${API_LANGUAGE}&page=${page}&query=${searchQuery}`
    );

    if (data.status !== 200) {
      throw new Error('Please try again... Failed communication with server.');
    }
    if (data.results.length > 0) {
      return data; // => {page, results, total_pages, total_results}
    } else {
      Notify.failure(`${searchQuery} doesn't exist. Try searching otherwise...`, {
        position: `center-top`,
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
    if (response.status !== 200 || response.data == null) {
      throw new Error('Failed fetching movie data... Please try again.');
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};
