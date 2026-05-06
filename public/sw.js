const SW_VERSION = "v1";
const STATIC_CACHE = `static-${SW_VERSION}`;
const RUNTIME_CACHE = `runtime-${SW_VERSION}`;
const APP_SHELL = [
  "/",
  "/dashboard",
  "/estudios",
  "/estudios/estudio-basico-biblia",
  "/estudios/curso-orar-efectivamente",
  "/estudios/curso-fe-que-transforma",
  "/estudios/curso-mayordomia-cristiana",
  "/estudios/curso-mayordomia-intermedia",
  "/estudios/curso-mayordomia-avanzada",
  "/estudios/seminario-familia-cristiana",
  "/estudios/seminario-liderazgo-servidor",
  "/lecciones/1",
  "/oracion/lecciones/1",
  "/fe/lecciones/1",
  "/mayordomia/lecciones/1",
  "/mayordomia-intermedia/lecciones/1",
  "/mayordomia-avanzada/lecciones/1",
];

const LESSON_ROUTE_PREFIXES = [
  "/lecciones/",
  "/oracion/lecciones/",
  "/fe/lecciones/",
  "/mayordomia/lecciones/",
  "/mayordomia-intermedia/lecciones/",
  "/mayordomia-avanzada/lecciones/",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    const isLessonRoute = LESSON_ROUTE_PREFIXES.some((prefix) =>
      requestUrl.pathname.startsWith(prefix)
    );

    if (isLessonRoute) {
      event.respondWith(
        caches.match(event.request).then((cached) => {
          if (cached) {
            return cached;
          }

          return fetch(event.request)
            .then((response) => {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(event.request, responseClone);
              });
              return response;
            })
            .catch(() => caches.match("/dashboard") || caches.match("/"));
        })
      );
      return;
    }

    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached || caches.match("/"))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
