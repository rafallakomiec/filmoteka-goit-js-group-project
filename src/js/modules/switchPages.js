import { displayItems } from './displayItems.js';
import { API_KEY } from './fetchFilms.js';
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

async function switchPage(pageNumber, query) {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page: pageNumber,
    },
  });

  const { data } = response;
  const films = data.results;
  displayItems(films);
}

export { switchPage };
