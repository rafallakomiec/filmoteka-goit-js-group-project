import { Notify } from 'notiflix';
import { load, save } from '../utils/localStorageHandlers';

const configNotiflix = {
  position: `center-top`,
};

const watchedMoviesKey = 'watchedMovies';
const queuedMoviesKey = 'queuedMovies';

const watched = load(watchedMoviesKey) || [];
const queued = load(queuedMoviesKey) || [];

const saveWatched = () => save(watchedMoviesKey, watched);
const saveQueued = () => save(queuedMoviesKey, queued);

export const setWatched = id => {
  if (watched.includes(id)) {
    Notify.warning('This movie is already in your watched list!', configNotiflix);
    return;
  }
  watched.push(id);
  try {
    saveWatched();
    Notify.success('The movie has been added to your watched list!', configNotiflix);
  } catch (error) {
    console.error(error.message);
    Notify.failure('Oops! Something went wrong. Please try again...', configNotiflix);
  }
};

export const setQueued = id => {
  if (queued.includes(id)) {
    Notify.warning('This movie is already in your queue!', configNotiflix);
    return;
  }
  queued.push(id);
  try {
    saveQueued();
    Notify.success('The movie has been added to your queue!', configNotiflix);
  } catch (error) {
    console.error(error.message);
    Notify.failure('Oops! Something went wrong. Please try again...', configNotiflix);
  }
};
