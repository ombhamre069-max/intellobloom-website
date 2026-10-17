import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BusinessVenture } from "@/content/businesses";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SharedBusinessLayoutProps = {
  venture: BusinessVenture;
  children: React.ReactNode;
};

export function SharedBusinessLayout({ venture, children }: SharedBusinessLayoutProps) {
  const isStem = venture.theme === "intellistem";

  return (
    <div
      className={cn(
        "pt-[var(--nav-height)]",
        isStem ? "bg-off-white" : "bg-midnight text-white",
      )}
    >
      <div
        className={cn(
          "border-b",
          isStem ? "border-slate-200 bg-white" : "border-white/10 bg-graphite",
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-16">
          <div>
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-2 text-sm transition-colors",
                isStem ? "text-stem-grey hover:text-midnight" : "text-slate-muted hover:text-white",
              )}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Intellobloom
            </Link>
            <p
              className={cn(
                "mt-6 text-xs font-medium uppercase tracking-[0.2em]",
                isStem ? "text-stem-orange" : "text-agni",
              )}
            >
              {venture.category}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {isStem ? (
                <>
                  <span className="text-stem-grey">Intelli</span>
                  <span className="text-stem-orange">STEM</span>
                </>
              ) : (
                <>
                  Agni<span className="text-agni">Kawach</span>
                </>
              )}
            </h1>
            <p
              className={cn(
                "mt-4 max-w-2xl text-lg",
                isStem ? "text-stem-grey" : "text-slate-muted",
              )}
            >
              {venture.headline}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {venture.exploreUrl && (
              <a
                href={venture.exploreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  isStem
                    ? "inline-flex items-center justify-center rounded-lg bg-stem-orange px-6 py-3 text-base font-medium text-white shadow-[0_0_0_1px_rgb(242_140_40/0.35)] transition-colors hover:bg-[#e07d1f]"
                    : "inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-base font-medium text-white hover:bg-white/15"
                }
              >
                {isStem ? "Visit intellistem.in" : "Explore venture"}
              </a>
            )}
            <Button
              href={`/contact?interest=${encodeURIComponent(venture.name)}`}
              variant={isStem && venture.exploreUrl ? "outline" : isStem ? "primary" : "secondary"}
              size="lg"
            >
              Business enquiry
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
