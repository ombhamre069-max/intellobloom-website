import { Mail, MapPin } from "lucide-react";
import { company } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionPattern } from "@/components/ui/SectionPattern";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactSection() {
  const { presence } = company;

  return (
    <SectionPattern
      id="contact"
      pattern="blueprint"
      className="border-t border-midnight/8 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionReveal>
            <SectionHeader
              eyebrow="Contact"
              title={company.contact.headline}
              description={company.contact.subtext}
            />
            <ul className="mt-10 space-y-5">
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-midnight/10 bg-white text-electric shadow-soft">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-midnight/45">
                    Email
                  </p>
                  <a
                    href={`mailto:${presence.email}`}
                    className="mt-1 block text-sm font-medium text-midnight hover:text-electric"
                  >
                    {presence.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-midnight/10 bg-white text-agni shadow-soft">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-midnight/45">
                    Presence
                  </p>
                  <p className="mt-1 text-sm font-medium text-midnight">{presence.region}</p>
                  <p className="mt-1 text-xs text-midnight/60">{presence.regionNote}</p>
                </div>
              </li>
            </ul>
          </SectionReveal>
          <SectionReveal delay={100}>
            <div className="rounded-2xl border border-midnight/8 bg-white/90 p-6 shadow-soft backdrop-blur-sm sm:p-8">
              <ContactForm />
            </div>
          </SectionReveal>
        </div>
      </div>
    </SectionPattern>
  );
}
