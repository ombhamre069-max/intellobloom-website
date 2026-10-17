import type { MetadataRoute } from "next";
import { company } from "@/content/company";

export default function robots(): MetadataRoute.Robots {
  const base = company.productionDomain
    ? `https://${company.productionDomain.replace(/^https?:\/\//, "")}`
    : undefined;

  return {
    rules: { userAgent: "*", allow: "/" },
    ...(base && { sitemap: `${base}/sitemap.xml` }),
  };
}
