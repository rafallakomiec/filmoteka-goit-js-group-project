import { fetchItems } from './fetchItems';
import { displayItems } from './displayItems';
//
function switchPage(pageNumber, query) {
  fetchItems(pageNumber, query)
    .then(items => {
      displayItems(items);
    })
    .catch(error => {
      console.error(error);
    });
}
switchPage(1, 'popular');
