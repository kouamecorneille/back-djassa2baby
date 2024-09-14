const CACHE_NAME = 'my-cache-v1';
const CACHE_URLS = ['/index.html', '/styles.css', '/script.js', '/assets/*']; // Ajoute ici les fichiers à mettre en cache

self.addEventListener('install', (event) => {
  // Mise en cache initiale lors de l'installation du Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html'); // Fallback vers la page d'accueil en cas de problème réseau
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((networkResponse) => {
          // Optionnel : mise à jour du cache après une réponse réseau réussie
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  // Suppression des caches obsolètes lors de l'activation du nouveau Service Worker
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Supprime les anciens caches
          }
        })
      );
    })
  );
});
