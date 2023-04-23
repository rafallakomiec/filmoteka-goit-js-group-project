import { setQueued, setWatched } from './myLibraryHandlers';

const qs = s => document.querySelector(s);

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

export const openMovieModal = async id => {
  const setQueuedCb = (() => {
    const localID = id;
    setQueued(localID);
  })();

  const setWatchedCb = (() => {
    const localID = id;
    setWatched(localID);
  })();

  const closeMovieModal = () => {
    toggleModal();
    refs.modalCloseBtn.removeEventListener('click', this);
    refs.modalQueueBtn.removeEventListener('click', setQueuedCb);
    refs.modalWatchedBtn.removeEventListener('click', setWatchedCb);
    refs.modalContainer.innerHTML = '';
  };

  refs.modalCloseBtn.addEventListener('click', closeMovieModal);
  refs.modalQueueBtn.addEventListener('click', setQueuedCb);
  refs.modalWatchedBtn.addEventListener('click', setWatchedCb);
  toggleModal();
  return closeMovieModal;
};
