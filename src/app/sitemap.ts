import type { MetadataRoute } from "next";
import { company } from "@/content/company";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!company.productionDomain) {
    return [];
  }

  const base = `https://${company.productionDomain.replace(/^https?:\/\//, "")}`;
  const routes = [
    "",
    "/about",
    "/contact",
    "/innovation",
    "/verticals/education",
    "/verticals/energy",
    "/businesses/intellistem",
    "/businesses/agnikawach",
    "/privacy",
    "/terms",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.7,
  }));
}
