const BASE = location.protocol + "//" + location.host;
const PREFIX = "V33";
const CACHED_FILES = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  `${BASE}/pwa.js`,
  `${BASE}/script.js`,
  "https://unpkg.com/typewriter-effect@latest/dist/core.js",
   "https://code.jquery.com/jquery-3.6.0.js",
   `${BASE}/style.css`,
   `${BASE}/assets/img/concert1.jpg`,
   `${BASE}/assets/video/Vinyl.mp4`,
   `${BASE}/assets/img/Aldebert.jpg`,
   `${BASE}/assets/img/Aldebert2.jpg`,
   `${BASE}/assets/img/batterie.jpg`,
   `${BASE}/assets/img/bricolage.jpg`,
   `${BASE}/assets/img/bricolage2.jpg`,
   `${BASE}/assets/img/moi.jpg`,
   `${BASE}/assets/img/puissance4.jpg`,
   `${BASE}/assets/img/puissance4-2.jpg`,
   `${BASE}/assets/img/restaurant.jpg`,
   `${BASE}/assets/img/restaurant2.jpg`,
   `${BASE}/assets/img/siteVoyage.jpg`,
   `${BASE}/assets/img/siteVoyage2.JPG`,
   `${BASE}/assets/img/vinyl.jpg`,
   `${BASE}/assets/ressource/facebook.svg`,
   `${BASE}/assets/ressource/github.svg`,
   `${BASE}/assets/ressource/linkedin.svg`,
   `${BASE}/circle-progress.js`,
   `${BASE}/assets/sound/boom.wav`,
   `${BASE}/assets/sound/CaisseClair.wav`,
   `${BASE}/assets/sound/Cymbale40cm.wav`,
   `${BASE}/assets/sound/hihat.wav`,
   `${BASE}/assets/sound/kick.wav`,
   `${BASE}/assets/sound/openhat.wav`,
   `${BASE}/assets/sound/ride.wav`,
   `${BASE}/assets/sound/snare.wav`,
   `${BASE}/assets/sound/tink.wav`,
   `${BASE}/assets/sound/tom.wav`,
   `${BASE}/assets/sound/TomAigu.wav`,
   `${BASE}/assets/sound/Tomgrave.wav`,
   `${BASE}/assets/sound/TomMedium.wav`,
];
const LAZY_CACHE = [`${BASE}/posts.json`];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PREFIX);
      await cache.addAll([...CACHED_FILES, "/offline.html"]);
    })()
  );
  // console.log(`${PREFIX} Install`);
});

self.addEventListener("activate", (event) => {
  clients.claim();
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!key.includes(PREFIX)) {
            return caches.delete(key);
          }
        })
      );
    })()
  );

});

self.addEventListener("fetch", (event) => {
  // console.log(
  //   `${PREFIX} Fetching : ${event.request.url}, Mode : ${event.request.mode}`
  // );
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          return await fetch(event.request);
        } catch (e) {
          const cache = await caches.open(PREFIX);
          return await cache.match("/offline.html");
        }
      })()
    );
  } else if (CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  } else if (LAZY_CACHE.includes(event.request.url)) {
    event.respondWith(
      (async () => {
        try {
          const cache = await caches.open(PREFIX);
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            cache.put(event.request, preloadResponse.clone());
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (e) {
          return await caches.match(event.request);
        }
      })()
    );
  }
});
