const staticAssets = [
    './index.html',
    './app.js',
    './style.css'
  ];
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1')
        .then(res => {
          console.log('wait.........!')
          return res.addAll(staticAssets);
        })
    );
    console.log('installed');
    // var cache = caches.open('v1');
    // cache.addAll(staticAssets);
  });
  
  self.addEventListener('activate', (event) => {
    console.log('activated');
  });
  
  self.addEventListener('fetch', (ev) => {
    console.log('Fetch from Service Worker ', ev);
    const req = ev.request;
const  url = new URL(req.url);
    if(url.orgin === location.origin){
        ev.respondWith(cacheFirst(req));
    }
    return ev.respondWith(networkFirst(req));
  });
  
  function cacheFirst(req) {
    return caches.match(req)
      .then(res => res)
      .catch(() => fetch(req));
  }

    async  function networkFirst(req) {
        const dynamicCache = await caches.open('v1-dynamic');
        try{
            const networkResponse = await fetch(req);
            dynamicCache.put(req, networkResponse.clone());
            return networkResponse;
        }
        catch(err){
            const cacheResponse = caches.match(req);
            return cacheResponse;
        }
   
  }