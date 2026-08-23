/* Service worker for "סול קולאז' של עירא"
   Strategy: NETWORK FIRST.
   - When online you always get the newest version (no stuck old versions).
   - Cache is only a fallback for offline use.
   Its presence is what lets Android offer a real "Install app". */

const CACHE = 'sole-collage-era-v41';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  /* The music file never changes and is several megabytes, so serve it from
     the cache whenever we already have it rather than re-downloading it every
     time the slideshow runs. Everything else stays network-first. */
  if (req.url.indexOf('/music/') !== -1) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res && (res.status === 200 || res.status === 206)) {
          const copy = res.clone();
          if (res.status === 200) {
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
        }
        return res;
      }))
    );
    return;
  }

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && req.url.startsWith(self.location.origin)) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
