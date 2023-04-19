import { watched, saveToWatchedLocalStorage } from './fetchWatched.js';

import { queue, setQueueLocalStoradge } from './fetchQueued.js';

export function onAddToWatched(id) {
  if (watched.includes(id)) {
    return;
  }
  watched.push(id);
  saveToWatchedLocalStorage(watched);
}

export function onAddToQueue(id) {
  if (queue.includes(id)) {
    return;
  }
  queue.push(id);
  setQueueLocalStoradge(queue);
}
