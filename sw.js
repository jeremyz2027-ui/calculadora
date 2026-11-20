const CACHE_NAME = 'calculadora-pwa-v1';
const ARCHIVOS_A_CACHEAR = [  
  './index.html',
  './manifest.json',
   './icon-512.png'
];

// Instalar y guardar archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_A_CACHEAR))
  );
  self.skipWaiting();
});

// Limpiar cachés viejas al actualizar versión
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Responder desde caché primero y caer en red si no está
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      return respuesta || fetch(event.request);
    })
  );
});