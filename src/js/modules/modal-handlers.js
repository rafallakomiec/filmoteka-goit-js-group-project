import { setQueued, setWatched, clearItem, watched, queued } from './library-handlers';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const qs = s => document.querySelector(s);

export const openMovieModal = async id => {
  const refs = {
    modal: qs('.movie-modal-backdrop'),
    modalContainer: qs('.modal__container'),
    modalWatchedBtn: qs('.modal__btn--to-watched'),
    modalQueueBtn: qs('.modal__btn--to-queue'),
    modalClearBtn: qs('.modal__btn--clear'),
    modalCloseBtn: qs('.modal__close-btn'),
  };

  const toggleModal = () => {
    refs.modal.classList.toggle('is-hidden');
  };

  const setQueuedCb = async () => {
    const localID = id;
    await setQueued(localID);
    refs.modalWatchedBtn.classList.remove('movie-modal__elem--hidden');
    refs.modalQueueBtn.classList.add('movie-modal__elem--hidden');
    refs.modalClearBtn.classList.remove('movie-modal__elem--hidden');
  };

  const setWatchedCb = async () => {
    const localID = id;
    await setWatched(localID);
    refs.modalWatchedBtn.classList.add('movie-modal__elem--hidden');
    refs.modalQueueBtn.classList.remove('movie-modal__elem--hidden');
    refs.modalClearBtn.classList.remove('movie-modal__elem--hidden');
  };

  const clearItemCb = async () => {
    const localID = id;
    await clearItem(localID);
    refs.modalWatchedBtn.classList.remove('movie-modal__elem--hidden');
    refs.modalQueueBtn.classList.remove('movie-modal__elem--hidden');
    refs.modalClearBtn.classList.add('movie-modal__elem--hidden');
  };

  const closeMovieModal = () => {
    toggleModal();
    enableBodyScroll(refs.modal);
    document.removeEventListener('keyup', onKeyStroke);
    refs.modal.removeEventListener('click', onModalBackdropClick);
    refs.modalCloseBtn.removeEventListener('click', closeMovieModal);
    refs.modalQueueBtn.removeEventListener('click', setQueuedCb);
    refs.modalWatchedBtn.removeEventListener('click', setWatchedCb);
    refs.modalClearBtn.removeEventListener('click', clearItemCb);
    refs.modalContainer.innerHTML = '';
  };

  const onKeyStroke = event => {
    if (event.key === 'Escape') {
      closeMovieModal();
    }
  };

  const onModalBackdropClick = event => {
    if (event.target.classList.contains('movie-modal-backdrop')) {
      closeMovieModal();
    }
  };

  if (watched.includes(id)) {
    refs.modalWatchedBtn.classList.add('movie-modal__elem--hidden');
  } else if (queued.includes(id)) {
    refs.modalQueueBtn.classList.add('movie-modal__elem--hidden');
  } else {
    refs.modalClearBtn.classList.add('movie-modal__elem--hidden');
  }

  disableBodyScroll(refs.modal);
  document.addEventListener('keyup', onKeyStroke);
  refs.modal.addEventListener('click', onModalBackdropClick);
  refs.modalCloseBtn.addEventListener('click', closeMovieModal);
  refs.modalQueueBtn.addEventListener('click', setQueuedCb);
  refs.modalWatchedBtn.addEventListener('click', setWatchedCb);
  refs.modalClearBtn.addEventListener('click', clearItemCb);
  toggleModal();
  return closeMovieModal;
};
