var CACHE_NAME = 'app_vehiculos_cache';
var urlsToCache = [
  '/',
//   '/index.html',
//   '/Buscar.html',
//   '/Login.html',
//   '/404.html',
//   'script/altaReclamo.js',
//   'script/login.js',
//   'script/misReclamos.js',
//   'js/js.js',
//   'js/jQuery.min.js',
//   'css/buscar.css',
//   'css/login.css',
//   'css/styleResponsive.css',
//   'css/styles.css',
 
//   'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900',
//   'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache open!');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // remove old caches
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key != CACHE_NAME) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('Now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/index.html').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

 /* if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {
        scope: 'isstracker'
    }).then(function(reg) {
        console.log("Service worker registered")
    }).catch(function(err) {
        console.log(err);
    });*/




