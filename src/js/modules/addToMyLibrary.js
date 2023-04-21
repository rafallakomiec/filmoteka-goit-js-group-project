import Notiflix from 'notiflix';
import { load, save } from './storage.js';

const watchedMoviesKey = 'watchedMovies';
const queuedMoviesKey = 'queuedMovies';

const watched = load(watchedMoviesKey) || [];
const queue = load(queuedMoviesKey) || [];

const saveWatched = () => save(watchedMoviesKey, watched);
const saveQueued = () => save(queuedMoviesKey, queue);

export const setWatched = (id) => {
    if (watched.includes(id)) {
        Notiflix.Notify.warning('This movie is already in your watched list.');
    return;
    }
        watched.push(id);
    try {
        saveWatched();
        Notiflix.Notify.success('The movie has been added to your watched list.');
    } catch (error) {
        console.error(error);
        Notiflix.Notify.failure('Oops! Something went wrong. Please try again later.');
        Notiflix.Notify.info('Please try again in a moment.');
    }
};

export const setQueued = (id) => {
    if (queue.includes(id)) {
        Notiflix.Notify.warning('This movie is already in your queue.');
    return;
    }
        queue.push(id);
    try {
        saveQueued();
        Notiflix.Notify.success('The movie has been added to your queue.');
    } catch (error) {
        console.error(error);
        Notiflix.Notify.failure('Oops! Something went wrong. Please try again later.');
        Notiflix.Notify.info('Please try again in a moment.');
    }
};