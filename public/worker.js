const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1'
// var CACHE_NAME = 'pwa-task-manager';
const files = [
    '/',
    '/completed',
    '/Logo/android-chrome-192x192.png',
    '/Logo/android-chrome-512x512.png',
    '/site.webmanifest',
    '/Logo/favicon.ico',
    '/Logo/apple-touch-icon.png',
    "/Logo/logo16.png",
    "/Logo/logo32.png",
    "/Logo/logo140.png",
    "/Logo/logo152.png",
    "/Logo/mstile-150x150.png"
];

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Files cached successfully');
                return cache.addAll(files);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    if (event.request.url.includes("/api/")) {
        event.respondWith(
            caches.open(DATA_CACHE_NAME)
                .then(cache => {
                    return fetch(event.request)
                        .then(response => {
                            // only cache responses that return 200, 201 or 202 statuses
                            if (response.status >= 200 && response.status <= 202) {
                                cache.put(event.request.url, response.clone());
                            }
                            return response;
                        })
                        .catch(err => {
                            console.log(err);
                            return cache.match(event.request);
                        })
                })
                .catch(err => console.log(err))
        );
        return;
    }
    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request);
                });
            })
            .catch(err => console.log(err))
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});