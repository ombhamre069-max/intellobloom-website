import { cn } from "@/lib/utils";

type Pattern = "blueprint" | "graph" | "squares";

const patternClass: Record<Pattern, string> = {
  blueprint: "pattern-blueprint",
  graph: "pattern-graph",
  squares: "pattern-squares",
};

type SectionPatternProps = {
  children: React.ReactNode;
  pattern?: Pattern;
  id?: string;
  className?: string;
  as?: "section" | "div";
};

/**
 * Light-section wrapper with a professional graph / blueprint surface.
 */
export function SectionPattern({
  children,
  pattern = "blueprint",
  id,
  className,
  as: Tag = "section",
}: SectionPatternProps) {
  return (
    <Tag
      id={id}
      className={cn("relative overflow-hidden", patternClass[pattern], className)}
    >
      <div className="relative z-[1]">{children}</div>
    </Tag>
  );
}
