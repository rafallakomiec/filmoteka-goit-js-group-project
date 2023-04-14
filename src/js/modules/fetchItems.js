const API_KEY = '1c8f6b064eb2a1f6bd306bc5a0f759ec';

const fetchItems = async (searchQuery, page) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=1`,
  );
  const data = await response.json();
  return data;
};

export default fetchItems;
