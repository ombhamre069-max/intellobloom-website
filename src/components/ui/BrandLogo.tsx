export { BrandLockup as BrandLogo } from "@/components/ui/BrandLockup";
export { BrandLockup } from "@/components/ui/BrandLockup";

import { cn } from "@/lib/utils";

export function IntelliSTEMWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-xl font-semibold", className)}>
      <span className="text-steel">Intelli</span>
      <span className="text-electric">STEM</span>
    </span>
  );
}

export function AgniKawachWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-xl font-semibold tracking-tight text-off-white",
        className,
      )}
    >
      Agni<span className="text-agni">Kawach</span>
    </span>
  );
}
