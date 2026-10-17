import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: "Intellobloom terms of use placeholder — replace with approved legal text.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 pt-[calc(var(--nav-height)+4rem)] sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-midnight">Terms of Use</h1>
      <p className="mt-6 text-stem-grey leading-relaxed">
        Terms of use will be published here when approved. Until then, use of this website is
        provided for informational purposes about Intellobloom and its ventures.
      </p>
    </div>
  );
}
