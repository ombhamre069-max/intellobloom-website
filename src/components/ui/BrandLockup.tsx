import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";

type BrandLockupProps = {
  variant?: "light" | "dark";
  size?: "nav" | "hero" | "footer";
  showMark?: boolean;
  href?: string;
  className?: string;
  priority?: boolean;
};

const sizeMap = {
  nav: {
    mark: 46,
    primary: "text-[0.95rem] sm:text-[1.05rem] tracking-[0.14em]",
    secondary: "text-[9px] tracking-[0.28em]",
    gap: "gap-3.5",
  },
  hero: {
    mark: 64,
    primary: "text-[clamp(1.5rem,3.5vw,2.35rem)] tracking-[0.18em]",
    secondary: "text-[clamp(0.65rem,1.2vw,0.8rem)] tracking-[0.32em]",
    gap: "gap-4",
  },
  footer: {
    mark: 44,
    primary: "text-base tracking-[0.14em]",
    secondary: "text-[10px] tracking-[0.28em]",
    gap: "gap-3",
  },
};

/**
 * Live-site brand lockup:
 * [circular IB mark]  INTELLOBLOOM
 *                     IB GROUP
 */
export function BrandLockup({
  variant = "dark",
  size = "nav",
  showMark = true,
  href = "/",
  className,
  priority = false,
}: BrandLockupProps) {
  const s = sizeMap[size];
  const light = variant === "light";

  const content = (
    <span className={cn("inline-flex items-center", s.gap, className)}>
      {showMark && (
        <Image
          src={company.logoMark}
          alt=""
          width={128}
          height={128}
          priority={priority}
          className="shrink-0 rounded-full object-contain"
          style={{ width: s.mark, height: s.mark }}
        />
      )}
      <span className="flex flex-col items-start justify-center leading-none">
        <span
          className={cn(
            "font-display font-semibold uppercase",
            s.primary,
            light ? "text-white" : "text-midnight",
          )}
        >
          {company.brandPrimary}
        </span>
        <span
          className={cn(
            "mt-1.5 font-semibold uppercase",
            s.secondary,
            light ? "text-white/75" : "text-midnight/70",
          )}
        >
          {company.brandSecondary}
        </span>
      </span>
    </span>
  );

  if (!href) {
    return (
      <span
        className="inline-flex shrink-0"
        aria-label={`${company.brandPrimary} ${company.brandSecondary}`}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 transition-opacity hover:opacity-90"
      aria-label={`${company.brandPrimary} ${company.brandSecondary} home`}
    >
      {content}
    </Link>
  );
}
