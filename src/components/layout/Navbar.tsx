"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { primaryNav } from "@/content/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const navShadowOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const boxShadow = useTransform(
    navShadowOpacity,
    (v) => `0 8px 30px rgb(63 68 74 / ${v * 0.08})`,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  const navLinkClass = (href: string) => {
    const active = isActive(href);
    return cn(
      "group relative text-sm transition-colors duration-[var(--duration-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stem-orange rounded-sm px-1 py-0.5",
      active ? "text-stem-orange" : "text-stem-grey hover:text-midnight",
    );
  };

  const resolveHref = useCallback(
    (href: string) => {
      if (href.startsWith("/#") && pathname !== "/") {
        return `/${href.slice(1)}`;
      }
      return href;
    },
    [pathname],
  );

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-normal)]",
        scrolled ? "glass-nav-light" : "bg-white/80 backdrop-blur-md",
      )}
      style={reduced ? undefined : { boxShadow }}
    >
      <nav
        className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <BrandLogo variant="dark" size="nav" priority />

        <ul className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link href={resolveHref(item.href)} className={navLinkClass(item.href)}>
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 rounded-full bg-stem-orange transition-all duration-300",
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                  )}
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="/contact" size="sm">
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-midnight lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stem-orange"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[var(--nav-height)] z-40 bg-white/98 backdrop-blur-md transition-opacity lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col gap-1 px-6 py-8">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={resolveHref(item.href)}
              className="rounded-lg px-3 py-3 text-lg text-midnight hover:bg-stem-orange/10"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-6 w-full" size="lg">
            Let&apos;s Talk
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
