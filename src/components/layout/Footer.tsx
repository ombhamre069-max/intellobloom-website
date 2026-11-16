import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { company } from "@/content/company";
import { footerNav } from "@/content/navigation";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { CopyrightYear } from "@/components/layout/CopyrightYear";

export function Footer() {
  const { presence } = company;

  return (
    <footer className="relative overflow-hidden pattern-footer text-white">
      <div className="relative z-[1]">
        {/* Closing presence band */}
        <div className="border-b border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-16">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-agni">
                Connect
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {presence.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                {presence.body}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={`mailto:${presence.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-electric px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-electric/90"
              >
                Email {presence.email}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                Contact form
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
            <div>
              <BrandLockup variant="light" size="footer" />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
                {company.parentDescription}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/45">
                {presence.legalLine}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerNav.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90">
                What we work on
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerNav.verticals.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90">
                Reach us
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">Email</p>
                    <a
                      href={`mailto:${presence.email}`}
                      className="mt-1 block text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {presence.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-agni" aria-hidden />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">Presence</p>
                    <p className="mt-1 text-sm text-white/80">{presence.region}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/45">
                      {presence.regionNote}
                    </p>
                  </div>
                </li>
              </ul>
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                {footerNav.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/45 transition-colors hover:text-white/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © <CopyrightYear /> {company.legalName}. All rights reserved.
            </p>
            <p className="text-xs">
              IntelliSTEM and AgniKawach are ventures under Intellobloom (IB Group).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
