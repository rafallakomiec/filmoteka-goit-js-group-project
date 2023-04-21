export const openMovieModal = async () => {
  const qs = s => document.querySelector(s);
  const toggleModal = () => {
    refs.modal.classList.toggle('is-hidden');
  };
  const refs = {
    modal: qs('[data-modal]'),

    //modal description refs
    modalFilmPoster: qs('#modal-poster'),
    modalFilmTitle: qs('#modal-film-title'),
    modalVoteAverage: qs('#modal-vote-average'),
    modalVoteTotal: qs('#modal-votes-total'),
    modalPopularity: qs('#modal-votes-total'),
    modalOriginalTitle: qs('#modal-original-title'),
    modalGenre: qs('#modal-genre'),
    modalAbout: qs('#modal-about'),
    modalContent: qs('#modal__content'),

    //buttons
    modalBtnWatched: qs('#modal-button-watched'),
    modalBtnQueue: qs('#modal-button-queue'),
    modalBtnClose: qs('[data-modal-close]'),

    //movie-data
    movies: qs('.main-content__list'),
  };

  //OPENING MODAL
  refs.movies.addEventListener('click', e => {
    if (e.target.classList.contains('movie-item')) {
      toggleModal();
    }
  });
  //CLOSING MODAL
  refs.modalBtnClose.addEventListener('click', () => {
    toggleModal();
  });
};
