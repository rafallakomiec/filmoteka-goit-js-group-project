import fetchItems from './fetchItems';

const mainListOfMovies = document.querySelector('.main-content__list');

const displayItems = async (searchQuery, page) => {
  try {
    const data = await fetchItems(searchQuery, page);
    const movies = data.results;
    if (movies.length === 0) {
      return alert(`Your movie doesn't exist.`);
    }
    const showMovies = movies.map(m => {
      console.log(m);
      return `<p>${m.title}</p>`;
    }); // tworzenie listy filmów za pomocą map (m odnosi się do pojedyńczego filmu)
    mainListOfMovies.innerHTML = showMovies;
  } catch (error) {
    console.log(error.message);
  }
};

export default displayItems;
