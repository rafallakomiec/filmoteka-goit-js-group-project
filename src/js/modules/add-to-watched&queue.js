import Notiflix from 'notiflix';
import { watched, saveToWatchedLocalStorage } from './fetchWatched.js';
import { queue, setQueueLocalStoradge } from './fetchQueued.js';

export function onAddToWatched(id) {
  if (watched.includes(id)) {
    Notiflix.Notify.warning('This movie is already in your watched list.');
    return;
  }
  watched.push(id);
  try {
    saveToWatchedLocalStorage(watched);
    const watchedMovies = watched.join(',');
    localStorage.setItem('watchedMovies', watchedMovies);
    Notiflix.Notify.success('The movie has been added to your watched list.');
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please try again later.');
    Notiflix.Notify.info('Please try again in a moment.');
  }
}

export function onAddToQueue(id) {
  if (queue.includes(id)) {
    Notiflix.Notify.warning('This movie is already in your queue.');
    return;
  }
  queue.push(id);
  try {
    setQueueLocalStoradge(queue);
    const queuedMovies = queue.join(',');
    localStorage.setItem('queuedMovies', queuedMovies);
    Notiflix.Notify.success('The movie has been added to your queue.');
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please try again later.');
    Notiflix.Notify.info('Please try again in a moment.');
  }
}
