import type { Metadata } from "next";
import { company } from "@/content/company";

const siteName = "Intellobloom";

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const baseUrl = company.productionDomain
    ? `https://${company.productionDomain.replace(/^https?:\/\//, "")}`
    : undefined;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      type: "website",
      images: [{ url: "/branding/intellobloom-mark.png", alt: "Intellobloom" }],
      ...(baseUrl && { url: `${baseUrl}${path}` }),
    },
    ...(baseUrl && {
      alternates: { canonical: `${baseUrl}${path}` },
    }),
  };
}

export const defaultMetadata: Metadata = createPageMetadata({
  title: siteName,
  description: company.description,
  path: "/",
});
