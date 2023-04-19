import {
    watched,
    saveToWatchedLocalStorage
} from './fetchWatched';

import {
    queue,
    setQueueLocalStoradge
} from './fetchQueued';

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
