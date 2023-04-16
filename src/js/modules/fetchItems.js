import axios from 'axios';

const API_KEY = '1c8f6b064eb2a1f6bd306bc5a0f759ec';

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
    );
    const movies = await data.results;
    return movies;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchMoviesBySearchQuery = async (searchQuery, page = 1) => {
  try {
    const { data } = await axios.get(
      ` https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&page=${page}&query=${searchQuery}`,
    );
    const movies = await data.results;
    if (movies.length > 0) {
      return movies;
    } else {
      alert(`${searchQuery} doesn't exist.`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
