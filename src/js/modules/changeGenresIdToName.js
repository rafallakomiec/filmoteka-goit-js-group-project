import axios from 'axios';
const API_KEY = 'api_key=1c8f6b064eb2a1f6bd306bc5a0f759ec';
const API_URL = 'https://api.themoviedb.org/3/';
const API_LANGUAGE = 'language=pl-PL';

const fetchGenresList = async () => {
  const { data } = await axios.get(`${API_URL}genre/movie/list?${API_KEY}&${API_LANGUAGE}`);
  const genres = data.genres;
  return genres;
};

export const changeGenresIdToName = async ([id, id2, id3]) => {
  const genres = await fetchGenresList();
  const changeGenreById = genres.filter(d => d.id === id || d.id === id2 || d.id === id3);
  const genresNames = changeGenreById.map(g => g.name);
  return genresNames;
};

/* changeGenresIdToName należy użyc podczas display'u by przekonwertować genres_id na name. przykład:
 results możemy uzyskać na 2 sposoby:
1 sposób =  
{ const {results} = await fetchImages(searchQuery, page);   }    <= results = tablica z obiektami: movie title, overview, genre_ids(tego potrzebujemy w tej funkcji) itd,
////
2 sposób = 
{ const data = await fetchImages(searchQuery, page);
const results = data.results;     }          <= results = tablica z obiektami: movie title, overview, genre_ids(tego potrzebujemy w tej funkcji) itd,

results.map(movie => {
  return `<li>movie.title</li>
  <li>${movie.changeGenresIdToName(movie.genre_ids)}    <= użycie funkcji
  `
})
*/
