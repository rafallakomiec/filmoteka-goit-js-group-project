const API_KEY = '1c8f6b064eb2a1f6bd306bc5a0f759ec';

const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
    );
    const data = await response.json();
    const movies = await data.results;
    return movies;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchMoviesBySearchQuery = async (searchQuery, page = 1) => {
  try {
    const response = await fetch(
      ` https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&page=${page}&query=${searchQuery};`,
    );
    const data = await response.json();
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
