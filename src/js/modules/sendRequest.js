import displayItems from './displayItems';

const mainListOfMovies = document.querySelector('.main-content__list');

export const sendRequest = async event => {
  mainListOfMovies.innerHTML = '';
  localStorage.removeItem('searchQuery');
  await event.preventDefault();
  const searchQuery = event.currentTarget.children[0].value;
  localStorage.setItem('searchQuery', searchQuery); // => przyda się do paginacji
  await displayItems(searchQuery);
};
