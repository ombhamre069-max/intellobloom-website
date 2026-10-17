"use client";

import { useSearchParams } from "next/navigation";
import { company } from "@/content/company";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactPageContent() {
  const searchParams = useSearchParams();
  const defaultInterest = searchParams.get("interest") ?? "";

  return (
    <div className="bg-off-white pt-[var(--nav-height)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-xl lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-electric">
              Contact
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-midnight">
              {company.contact.headline}
            </h1>
            <p className="mt-4 text-lg text-stem-grey">{company.contact.subtext}</p>
            {company.verifiedContact.email && (
              <p className="mt-8 text-sm text-midnight">
                Email:{" "}
                <a
                  href={`mailto:${company.verifiedContact.email}`}
                  className="text-electric hover:underline"
                >
                  {company.verifiedContact.email}
                </a>
              </p>
            )}
          </div>
          <ContactForm defaultInterest={defaultInterest} />
        </div>
      </div>
    </div>
  );
}
