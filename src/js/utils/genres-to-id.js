import axios from 'axios';
const API_KEY = 'api_key=1c8f6b064eb2a1f6bd306bc5a0f759ec';
const API_URL = 'https://api.themoviedb.org/3/';

export const fetchGenresList = async () => {
  const { data } = await axios.get(`${API_URL}genre/movie/list?${API_KEY}`);
  const genres = data.genres;
  return genres;
};

export const changeGenresIdToName = ([id, id2, id3], genres) => {
  const changeGenreById = genres.filter(d => d.id === id || d.id === id2 || d.id === id3);
  const genresNames = changeGenreById.map(g => g.name);
  return genresNames;
};
