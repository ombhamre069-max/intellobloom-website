import { company } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="section-glass-muted py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionReveal>
            <SectionHeader
              eyebrow="Contact"
              title={company.contact.headline}
              description={company.contact.subtext}
            />
          </SectionReveal>
          <SectionReveal delay={100}>
            <ContactForm />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
