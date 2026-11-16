"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Menu, X, GraduationCap, Flame } from "lucide-react";
import { primaryNav } from "@/content/navigation";
import { verticals } from "@/content/verticals";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const desktopPrimary = primaryNav.filter(
  (item) =>
    !["Education & Technology", "Energy & Industrial Safety"].includes(item.label),
);

export function MegaMenuNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const navShadow = useTransform(scrollY, [0, 80], [0, 1]);
  const boxShadow = useTransform(
    navShadow,
    (v) => `0 12px 40px rgb(16 28 44 / ${v * 0.1})`,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : !href.startsWith("/#") && pathname.startsWith(href);

  const resolveHref = useCallback(
    (href: string) =>
      href.startsWith("/#") && pathname !== "/" ? `/${href.slice(1)}` : href,
    [pathname],
  );

  const darkHero = pathname === "/" && !scrolled;

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || !darkHero
          ? "glass-nav-light"
          : "bg-transparent border-b border-transparent",
      )}
      style={reduced ? undefined : { boxShadow: scrolled ? boxShadow : undefined }}
    >
      <nav
        className="relative mx-auto flex min-h-[var(--nav-height)] max-w-7xl items-center justify-between gap-4 px-5 py-2 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <BrandLockup
          variant={darkHero && !scrolled ? "light" : "dark"}
          size="nav"
          priority
        />

        <ul className="hidden items-center gap-1 lg:flex xl:gap-1.5">
          {desktopPrimary.map((item) =>
            item.children ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setWorkOpen(true)}
                onMouseLeave={() => setWorkOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    darkHero && !scrolled
                      ? "text-white/80 hover:text-white"
                      : "text-midnight/70 hover:text-midnight",
                  )}
                  onClick={() => setWorkOpen((o) => !o)}
                  aria-expanded={workOpen}
                >
                  {item.label}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", workOpen && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {workOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,540px)] overflow-hidden rounded-xl border border-midnight/8 bg-white/95 p-4 shadow-soft backdrop-blur-xl"
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        <MegaPreview
                          href={verticals.education.href}
                          icon={GraduationCap}
                          title={verticals.education.title}
                          venture={verticals.education.venture}
                          tone="education"
                        />
                        <MegaPreview
                          href={verticals.energy.href}
                          icon={Flame}
                          title={verticals.energy.title}
                          venture={verticals.energy.venture}
                          tone="energy"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.href + item.label}>
                <Link
                  href={resolveHref(item.href)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? darkHero && !scrolled
                        ? "text-white"
                        : "text-electric"
                      : darkHero && !scrolled
                        ? "text-white/80 hover:text-white"
                        : "text-midnight/70 hover:text-midnight",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="hidden lg:block">
          <MagneticButton href="/contact" size="sm">
            Contact
          </MagneticButton>
        </div>

        <button
          type="button"
          className={cn(
            "rounded-md p-2 lg:hidden",
            darkHero && !scrolled ? "text-white" : "text-midnight",
          )}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-midnight/8 bg-platinum lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {primaryNav.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={resolveHref(item.href)}
                  className="rounded-md px-3 py-3 text-lg text-midnight"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <MagneticButton href="/contact" className="mt-4 w-full" size="lg">
                Contact
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MegaPreview({
  href,
  icon: Icon,
  title,
  venture,
  tone,
}: {
  href: string;
  icon: typeof GraduationCap;
  title: string;
  venture: string;
  tone: "education" | "energy";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-2 rounded-lg p-4 transition-all duration-300",
        tone === "education"
          ? "bg-[#E8F0FC] hover:bg-[#d9e7fb]"
          : "bg-midnight text-white hover:bg-charcoal",
      )}
    >
      <Icon
        className={cn("h-5 w-5", tone === "education" ? "text-electric" : "text-agni")}
      />
      <span className="font-display text-sm font-semibold">{title}</span>
      <span
        className={cn("text-xs", tone === "education" ? "text-steel" : "text-steel")}
      >
        {venture}
      </span>
    </Link>
  );
}
