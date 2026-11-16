import Link from "next/link";
import { company } from "@/content/company";
import { footerNav } from "@/content/navigation";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { CopyrightYear } from "@/components/layout/CopyrightYear";

export function Footer() {
  return (
    <footer className="border-t border-midnight/8 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <BrandLockup variant="dark" size="footer" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel">
              {company.parentDescription}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-steel/90">
              {company.legalName}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-midnight">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-steel hover:text-electric">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-midnight">
              What we work on
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.verticals.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-steel hover:text-electric"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-steel hover:text-electric">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-midnight">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-steel hover:text-electric">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-midnight/8 pt-8 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {company.legalName}. All rights reserved.
          </p>
          <p className="text-xs">
            IntelliSTEM and AgniKawach are ventures under Intellobloom (IB Group).
          </p>
        </div>
      </div>
    </footer>
  );
}
