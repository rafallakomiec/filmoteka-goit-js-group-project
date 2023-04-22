export function fetchPageNumbers(totalPages, currentPage) {
  const maxPages = 5;
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxPages) {
    if (currentPage <= 3) {
      endPage = maxPages;
    } else if (currentPage + 1 >= totalPages) {
      startPage = totalPages - maxPages + 1;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  let pageNumbers = Array.from(Array(endPage - startPage + 1), (_, i) => startPage + i);

  if (totalPages > maxPages) {
    if (currentPage >= 4) {
      pageNumbers.unshift('...');
      pageNumbers.unshift(1);
    }
    if (currentPage <= totalPages - 4) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  return pageNumbers;
}
