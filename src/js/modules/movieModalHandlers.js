import { setQueued, setWatched } from './myLibraryHandlers';

const qs = s => document.querySelector(s);

export const openMovieModal = async id => {
  const refs = {
    modal: qs('.movie-modal-backdrop'),
    modalContainer: qs('.modal__container'),
    modalWatchedBtn: qs('.modal__btn--to-watched'),
    modalQueueBtn: qs('.modal__btn--to-queue'),
    modalCloseBtn: qs('.modal__close-btn'),
  };

  const toggleModal = () => {
    refs.modal.classList.toggle('is-hidden');
  };

  const setQueuedCb = function () {
    const localID = id;
    setQueued(localID);
  };

  const setWatchedCb = function () {
    const localID = id;
    setWatched(localID);
  };

  const closeMovieModal = function () {
    toggleModal();
    refs.modalCloseBtn.removeEventListener('click', this);
    refs.modalQueueBtn.removeEventListener('click', setQueuedCb);
    refs.modalWatchedBtn.removeEventListener('click', setWatchedCb);
    refs.modalContainer.innerHTML = '';
  };

  const onKeyStroke = function (event) {
    if (event.key === 'Escape') {
      document.removeEventListener('keyup', onKeyStroke);
      closeMovieModal();
    }
  };

  document.addEventListener('keyup', onKeyStroke);
  refs.modalCloseBtn.addEventListener('click', closeMovieModal);
  refs.modalQueueBtn.addEventListener('click', setQueuedCb);
  refs.modalWatchedBtn.addEventListener('click', setWatchedCb);
  toggleModal();
  return closeMovieModal;
};
