import axios from 'axios';

const API_KEY = 'api_key=1c8f6b064eb2a1f6bd306bc5a0f759ec';
const API_URL = 'https://api.themoviedb.org/3/';
const API_LANGUAGE = 'language=en-US';

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get(`${API_URL}trending/all/day?${API_KEY}&${API_LANGUAGE}`);
    return data; // => {page, results, total_pages, total_results}
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchMoviesBySearchQuery = async (searchQuery, page = 1) => {
  try {
    const { data } = await axios.get(
      `${API_URL}search/movie?${API_KEY}&${API_LANGUAGE}page=${page}&query=${searchQuery}`,
    );
    if (data.results.length > 0) {
      return data; // => {page, results, total_pages, total_results}
    } else {
      alert(`${searchQuery} doesn't exist.`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchMovieById = async movieId => {
  try {
    const response = await axios.get(`${API_URL}movie/${movieId}?${API_KEY}&${API_LANGUAGE}`);
    const movie = response.data;
    return movie;
  } catch (error) {
    console.log(error.message);
  }
};
