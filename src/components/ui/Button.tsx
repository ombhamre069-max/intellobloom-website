import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-stem-orange text-white hover:bg-[#e07d1f] shadow-[0_0_0_1px_rgb(242_140_40/0.35)] focus-visible:ring-stem-orange",
  secondary:
    "bg-stem-grey/15 text-midnight border border-stem-grey/25 hover:bg-stem-grey/20 focus-visible:ring-stem-grey",
  ghost:
    "text-slate-muted hover:text-white hover:bg-white/5 focus-visible:ring-white/30",
  outline:
    "border border-stem-grey/30 text-midnight bg-white hover:border-stem-orange/50 hover:text-stem-orange focus-visible:ring-stem-orange",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2 rounded-md",
  md: "text-sm px-5 py-2.5 rounded-lg",
  lg: "text-base px-6 py-3 rounded-lg",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & (
  | { href: string; onClick?: never; type?: never; disabled?: boolean }
  | {
      href?: never;
      onClick?: () => void;
      type?: "button" | "submit";
      disabled?: boolean;
    }
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-[var(--duration-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
