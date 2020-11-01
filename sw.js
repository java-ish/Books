const cacheName = "BFM-v1";
const staticAssets = ["./", "./index.html", "./css/style.css"];

self.addEventListener("install", async (e) => {

});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});

self.addEventListener("fetch", async (e) => {

});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
