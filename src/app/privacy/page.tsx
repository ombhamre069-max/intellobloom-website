import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Intellobloom privacy policy placeholder — replace with approved legal text.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 pt-[calc(var(--nav-height)+4rem)] sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-midnight">Privacy Policy</h1>
      <p className="mt-6 text-stem-grey leading-relaxed">
        A formal privacy policy will be published here when legal review is complete. Contact form
        submissions are processed only when backend delivery is configured via environment variables
        documented in the project README.
      </p>
    </div>
  );
}
