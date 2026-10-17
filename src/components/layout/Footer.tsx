import Link from "next/link";
import { company } from "@/content/company";
import { footerNav } from "@/content/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CopyrightYear } from "@/components/layout/CopyrightYear";

export function Footer() {

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo variant="dark" size="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stem-grey">
              {company.parentDescription}
            </p>
            {company.verifiedContact.email && (
              <p className="mt-4 text-sm text-midnight">
                <a
                  href={`mailto:${company.verifiedContact.email}`}
                  className="hover:text-electric"
                >
                  {company.verifiedContact.email}
                </a>
              </p>
            )}
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-midnight">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stem-grey hover:text-electric"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-midnight">
              Our Businesses
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.businesses.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stem-grey hover:text-stem-orange"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-stem-grey hover:text-stem-orange"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-midnight">
              Industries
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.industries.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stem-grey hover:text-electric"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    href={link.href}
                    className="text-sm text-stem-grey hover:text-electric"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {(company.social.linkedin || company.social.twitter) && (
              <div className="mt-8 flex gap-4">
                {company.social.linkedin && (
                  <a
                    href={company.social.linkedin}
                    className="text-sm text-stem-grey hover:text-electric"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                )}
                {company.social.twitter && (
                  <a
                    href={company.social.twitter}
                    className="text-sm text-stem-grey hover:text-electric"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    X
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-slate-100 pt-8 text-sm text-stem-grey sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> Intellobloom. All rights reserved.
          </p>
          <p className="text-xs">
            IntelliSTEM and AgniKawach are ventures under Intellobloom.
          </p>
        </div>
      </div>
    </footer>
  );
}
