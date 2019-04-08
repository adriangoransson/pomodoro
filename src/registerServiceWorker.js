/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {

    updatefound(registration) {
      registration.addEventListener('activate', (event) => {
        console.log('New worker. Deleting old cache');
        event.waitUntil(
          caches
            .keys()
            .then(keys => Promise.all(keys.map(key => caches.delete(key)))),
        );
      });
    },

    updated() {
      console.log('Service worker updated');
    },
  });
}
