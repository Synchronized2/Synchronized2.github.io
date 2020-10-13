var version = '1.0.2';
var cacheName = 'pwa-' + version;
var appShellFiles = [
    './',
    './index.html',
    './sw.js',
    './images/logo.png',
    './images/demo.jpg',
    './css/main.css',
    './css/searchs.css',
    './css/weather.css',
    './js/image.js',
    './js/jquery.js',
    './js/search.js',
    './js/weather.js',
];
self.addEventListener('install', function(e) {
    // self.skipWaiting();
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(appShellFiles);
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

// self.addEventListener('fetch', event => {
//     if (event.request && event.request.method !== 'GET') {
//         return
//     }
//     event.respondWith(
//         caches.open(cacheName)
//         .then(cache => {
//             return cache.match(event.request)
//                 .then(response => {
//                     if (response) {
//                         console.log('cache fetch: ' + event.request.url) //打印请求地址信息
//                         return response
//                     }
//                     return fetch(event.request) //fetch
//                         .then(req => {
//                             if (req.ok) cache.put(event.request, req.clone());
//                             return req
//                         })
//                         .catch() //离线(offline)
//                 })
//         })
//     )
// })

self.addEventListener('activate', event => {
    console.log('activate' + event)
    event.waitUntil(
        caches.keys()
        .then(keylist => {
            return Promise.all(
                keylist
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key)) //删除旧的缓存
            )
        }).then(() => self.clients.claim()))
})