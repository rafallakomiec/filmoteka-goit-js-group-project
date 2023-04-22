import { fetchFilms } from './fetchFilms.js';
import { fetchPageNumbers } from './fetchPageNumers.js';
import { switchPage } from './switchPages.js';
const resultsPerPage = 20;
const paginationContainer = document.querySelector('.pagination');

async function fetchTotalResults(query) {
  const response = await fetchFilms(query);
  return response.totalResults;
}

export async function createPaginationButtons() {
  const query = document.querySelector('.search__film').value;
  const totalResults = await fetchTotalResults(query);
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  paginationContainer.innerHTML = '';

  const pageNumbers = fetchPageNumbers(totalPages, 1);

  const buttons = pageNumbers.map(number => {
    const button = document.createElement('button');
    button.textContent = number;
    button.classList.add('pagination__button');
    if (number === 1) button.classList.add('active');
    // Dodaj event listener do każdego przycisku
    button.addEventListener('click', () => switchPage(number, query));
    return button;
  });

  const firstButton = document.createElement('button');
  firstButton.innerHTML = '&laquo;';
  firstButton.classList.add('pagination__button');
  if (pageNumbers[0] === 1) firstButton.disabled = true;
  firstButton.addEventListener('click', () => switchPage(1, query));
  buttons.unshift(firstButton);

  const lastButton = document.createElement('button');
  lastButton.innerHTML = '&raquo;';
  lastButton.classList.add('pagination__button');
  if (pageNumbers[pageNumbers.length - 1] === totalPages) lastButton.disabled = true;
  lastButton.addEventListener('click', () => switchPage(totalPages, query));
  buttons.push(lastButton);

  buttons.forEach(button => paginationContainer.appendChild(button));
}
