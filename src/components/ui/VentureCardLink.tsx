import Link from "next/link";
import type { BusinessVenture } from "@/content/businesses";
import { getVentureExploreUrl, isExternalVentureUrl } from "@/lib/venture-links";
import { cn } from "@/lib/utils";

type VentureCardLinkProps = {
  venture: BusinessVenture;
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function VentureCardLink({
  venture,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: VentureCardLinkProps) {
  const href = getVentureExploreUrl(venture);
  const external = isExternalVentureUrl(href);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </Link>
  );
}
