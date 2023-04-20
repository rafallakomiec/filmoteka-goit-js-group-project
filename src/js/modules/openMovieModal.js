// const filmTitle=document.querySelector

export const openMovieModal = () => {
  const qs = s => document.querySelector(s);
  const toggleModal = () => refs.modal.classList.toggle('is-hidden');
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
    //buttons
    modalBtnWatched: qs('#modal-button-watched'),
    modalBtnQueue: qs('#modal-button-queue'),
    modalBtnOpen: qs('[data-modal-open]'),
    modalBtnClose: qs('[data-modal-close]'),
  };

  refs.modalBtnOpen.addEventListener('click', toggleModal);
  refs.modalBtnClose.addEventListener('click', toggleModal);
};
