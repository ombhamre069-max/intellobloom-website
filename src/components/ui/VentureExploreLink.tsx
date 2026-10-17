import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BusinessVenture } from "@/content/businesses";
import { getVentureExploreUrl, isExternalVentureUrl } from "@/lib/venture-links";
import { cn } from "@/lib/utils";

type VentureExploreLinkProps = {
  venture: BusinessVenture;
  className?: string;
  label?: string;
};

export function VentureExploreLink({
  venture,
  className,
  label = `Explore ${venture.name}`,
}: VentureExploreLinkProps) {
  const href = getVentureExploreUrl(venture);
  const external = isExternalVentureUrl(href);
  const classes = cn(
    "inline-flex items-center gap-2 text-sm font-medium transition-colors",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {label}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
        <span className="sr-only">(opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}
