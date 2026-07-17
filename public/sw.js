const SW_VERSION = "v2";
const STATIC_CACHE = `static-${SW_VERSION}`;
const RUNTIME_CACHE = `runtime-${SW_VERSION}`;

// Solo rutas que existen. Si alguna falla, no se rompe la instalación.
const APP_SHELL = [
  "/",
  "/dashboard",
  "/iniciar-sesion",
  "/registrarse",
  "/pedidos-oracion",
  "/quienes-somos",
  "/politica-privacidad",
  "/offline.html",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable-512.png",
  "/apple-touch-icon.png",
  "/logo-iere.png",
  "/estudios/estudio-basico-biblia",
  "/estudios/curso-orar-efectivamente",
  "/estudios/curso-fe-que-transforma",
  "/estudios/curso-mayordomia-cristiana",
  "/estudios/curso-mayordomia-intermedia",
  "/estudios/curso-mayordomia-avanzada",
  "/lecciones/leccion-01",
  "/oracion/lecciones/oracion-leccion-01",
  "/fe/lecciones/fe-leccion-01",
  "/mayordomia/lecciones/mayordomia-leccion-01",
  "/mayordomia-intermedia/lecciones/mayordomia-intermedia-leccion-01",
  "/mayordomia-avanzada/lecciones/mayordomia-avanzada-leccion-01",
];

const LESSON_ROUTE_PREFIXES = [
  "/lecciones/",
  "/oracion/lecciones/",
  "/fe/lecciones/",
  "/mayordomia/lecciones/",
  "/mayordomia-intermedia/lecciones/",
  "/mayordomia-avanzada/lecciones/",
];

async function cacheUrls(cacheName, urls) {
  const cache = await caches.open(cacheName);
  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, { cache: "reload", credentials: "same-origin" });
        if (response && response.ok) {
          await cache.put(url, response.clone());
        }
      } catch {
        // No romper la instalación por un recurso puntual.
      }
    })
  );
}

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/icon") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".woff2") ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/offline.html"
  );
}

async function networkFirst(request, fallbackUrl) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await caches.match(fallbackUrl);
      if (fallback) return fallback;
    }
    return caches.match("/offline.html");
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    // Actualiza en segundo plano si hay red.
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, response));
        }
      })
      .catch(() => null);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match("/offline.html");
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheUrls(STATIC_CACHE, APP_SHELL));
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

self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "CACHE_URLS" || !Array.isArray(data.urls)) {
    return;
  }
  event.waitUntil(cacheUrls(RUNTIME_CACHE, data.urls));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // No cachear el propio SW ni APIs dinámicas de Next.
  if (requestUrl.pathname === "/sw.js") {
    return;
  }

  if (event.request.mode === "navigate") {
    const isLessonRoute = LESSON_ROUTE_PREFIXES.some((prefix) =>
      requestUrl.pathname.startsWith(prefix)
    );

    if (isLessonRoute) {
      event.respondWith(cacheFirst(event.request));
      return;
    }

    event.respondWith(networkFirst(event.request, "/"));
    return;
  }

  if (isStaticAsset(requestUrl.pathname)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  event.respondWith(networkFirst(event.request));
});
