const CACHE_NAME = 'nicola-portfolio-v1';
const urlsToCache = [
  '/',
  '/profile_optimized.jpg',
  '/profile.webp',
  '/manifest.json',
  '/favicon.ico'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch(() => {
        // Silent fail for cache errors
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip caching for API calls and external resources
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('google') ||
      event.request.url.includes('googleapis')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Return a fallback for failed requests
        if (event.request.destination === 'image') {
          return new Response('', { status: 404 });
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
}); 