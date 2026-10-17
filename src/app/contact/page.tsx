import { Suspense } from "react";
import { company } from "@/content/company";
import { createPageMetadata } from "@/lib/metadata";
import { ContactPageContent } from "./ContactPageContent";

export const metadata = createPageMetadata({
  title: "Contact",
  description: company.contact.subtext,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-off-white pt-[var(--nav-height)] px-5 py-24 text-stem-grey">
          Loading contact form…
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
