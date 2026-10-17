import type { BusinessVenture } from "@/content/businesses";

/** Primary destination for “Explore” CTAs (external product site when configured). */
export function getVentureExploreUrl(venture: BusinessVenture): string {
  return venture.exploreUrl ?? venture.href;
}

export function isExternalVentureUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
