import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IERE - Estudios Biblicos",
    short_name: "IERE Estudios",
    description: "Escuela Biblica de la Iglesia Espanola Reformada Episcopal.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/logo-iere.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-iere.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo-iere.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
