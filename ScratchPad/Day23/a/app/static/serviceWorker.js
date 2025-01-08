//global constant called STATIC_CACHE_NAME with the value ncparks-static-v0
const STATIC_CACHE_NAME = 'ncparks-static-v6';

function log(...data) {
  console.log("SWv1.6", ...data);
}

log("SW Script executing - adding event listeners");

self.addEventListener('install', event => {
  log('install', event);

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll([
        '/offline',
        //css
        '/css/base.css',
        '/css/error.css',
        '/css/home.css',
        '/css/login.css',
        '/css/offline.css',
        '/css/park.css',
        //img
        '/img/ncparkmap.png',
        '/img/park.jpg',
        //js
        '/js/APIClient.js',
        '/js/auth.js',
        '/js/common.js',
        '/js/home.js',
        '/js/HTTPClient.js',
        '/js/login.js',
        '/js/park.js',
        //external links
        'https://unpkg.com/leaflet@1.9.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.9.1/dist/leaflet.js',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
      ])
      // As soon as this method returns, the service worker is considered installed
    }));
});

self.addEventListener('activate', event => {
  log('activate', event);
  event.waitUntil(  //wait until promise resolves
    caches.keys().then(cacheNames => {  //get all names of caches in the sys and filter the old ones
      return cacheNames.filter(cacheName => cacheName.startsWith('ncparks-') && cacheName != STATIC_CACHE_NAME)
    }).then(oldCaches => {
      return Promise.all(
        oldCaches.map(cacheName => caches.delete(cacheName))  //convert each elem into a promise and delete the old ones
      );
    })
  );
  // As soon as this method returns, the service worker is considered active
});

function fetchAndCache(request) {
  return fetch(request).then(response => {
    const requestURL = new URL(request.url);
    if (response.ok && request.method === 'GET') {
      return caches.open(STATIC_CACHE_NAME).then(cache => {
        cache.put(request, response);
      });
    }
    return response.clone();  //reset buffer of stream of bytes

  });

}

self.addEventListener('fetch', event => {
  event.respondWith(
    cacheFirst(event.request)
  );
});



self.addEventListener('message', event => {
  log('message', event.data);
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});


function cacheFirst(request) {
  return caches.match(request)
    .then(response => {
      return response || fetchAndCache(request);
    })
    .catch(error => {
      return caches.match('/offline');
    });
}