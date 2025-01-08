function log(...data) {
    console.log("SWv5.0", ...data);
}

log("SW Script executing - adding event listeners");

self.addEventListener("install", event => {
    log('install', event);
});

self.addEventListener("activate", event => {
    log('activate', event);
});

self.addEventListener("fetch", event => {
    log('fetch', event);

    self.clients.get(event.clientId).then(client => {
        if(client)
          client.postMessage({url: event.request.url});
        });
});

self.addEventListener('message', event => {
    log('message', event.data);
    if(event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });