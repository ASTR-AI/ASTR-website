const CACHE_NAME = 'astr-static-cache-v1';
const DYNAMIC_CACHE_NAME = 'astr-dynamic-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/solutions.html',
  '/philosophy.html',
  '/rd.html',
  '/internship.html',
  '/connect.html',
  '/verify.html',
  '/coming-soon.html',
  '/mission-docs.html',
  '/Pictures/logo-optimized.webp',
  '/Pictures/arrow.png?v=2',
];

// Install Event - Pre-cache Static Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching offline shell');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE_NAME) {
              console.log('[Service Worker] Clearing old cache', cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event - Dynamic Caching and Offline Fallback
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Ignore non-GET requests and external resources (except Google Fonts)
  if (
    event.request.method !== 'GET' ||
    (!event.request.url.startsWith(self.location.origin) &&
      !event.request.url.startsWith('https://fonts.gstatic.com') &&
      !event.request.url.startsWith('https://fonts.googleapis.com'))
  ) {
    return;
  }

  // Ignore Dev Server Web Sockets or hot reloading requests
  if (
    requestUrl.pathname.includes('@vite') ||
    requestUrl.pathname.includes('hmr') ||
    event.request.url.includes('ws://')
  ) {
    return;
  }

  // Network-First strategy for HTML pages/navigation to always get updates, falling back to cache
  if (
    event.request.mode === 'navigate' ||
    requestUrl.pathname.endsWith('.html') ||
    requestUrl.pathname === '/'
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the latest copy of the page
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            // Fallback for navigation if not specifically cached
            return caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Cache-First strategy for Google Fonts
  if (
    event.request.url.includes('fonts.gstatic.com') ||
    event.request.url.includes('fonts.googleapis.com')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((response) => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      })
    );
    return;
  }

  // Stale-While-Revalidate strategy for CSS, JS, and local mockup images
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Suppress console errors when offline
        });

      return cachedResponse || fetchPromise;
    })
  );
});
