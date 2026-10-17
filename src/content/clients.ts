export type ClientEngagement = {
  id: string;
  organizationName: string;
  logoSrc?: string;
  industry: string;
  relationshipType?: "client" | "partner" | "engagement";
  relatedVenture: string;
  description?: string;
  externalUrl?: string;
  sector: "education" | "oil-gas" | "industrial-partners";
  published: boolean;
};

/**
 * Add verified client and partner entries here when approved for publication.
 * Entries with published: false are excluded from the public site.
 */
export const clientEngagements: ClientEngagement[] = [];

export const clientSectors = [
  { id: "education" as const, label: "Education Sector" },
  { id: "oil-gas" as const, label: "Oil & Gas Sector" },
  {
    id: "industrial-partners" as const,
    label: "Industrial and Technology Partners",
  },
];

export function getPublishedEngagements(): ClientEngagement[] {
  return clientEngagements.filter((c) => c.published);
}
