import type { MetadataRoute } from "next";

import { studies } from "@/features/studies/data/studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();
  const staticRoutes = [
    "",
    "/iniciar-sesion",
    "/registrarse",
    "/dashboard",
    "/pedidos-oracion",
    "/quienes-somos",
    "/admin",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const studyEntries = studies.map((study) => ({
    url: `${baseUrl}/estudios/${study.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...studyEntries];
}
