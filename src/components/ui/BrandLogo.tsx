import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Icon + INTELLOBLOOM wordmark (AI/Robotics subline removed) */
const LOGO_SRC = "/branding/intellobloom-logo.png";
const LOGO_W = 551;
const LOGO_H = 695;

type BrandLogoProps = {
  variant?: "light" | "dark";
  className?: string;
  /** Nav: compact full lockup. Footer: larger lockup. */
  size?: "nav" | "footer";
  priority?: boolean;
};

export function BrandLogo({
  variant = "dark",
  className,
  size = "nav",
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-block shrink-0 transition-opacity hover:opacity-90", className)}
      aria-label="Intellobloom home"
    >
      <Image
        src={LOGO_SRC}
        alt="Intellobloom"
        width={LOGO_W}
        height={LOGO_H}
        priority={priority}
        className={cn(
          "h-auto w-auto object-contain object-left",
          size === "nav" && "max-h-[3.25rem] w-auto sm:max-h-14",
          size === "footer" && "max-h-32 sm:max-h-36",
          variant === "light" && size === "nav" && "drop-shadow-sm",
        )}
      />
    </Link>
  );
}

export function IntelliSTEMWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-xl font-semibold", className)}>
      <span className="text-stem-grey">Intelli</span>
      <span className="text-stem-orange">STEM</span>
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
