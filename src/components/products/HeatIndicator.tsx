import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeatIndicatorProps {
  level: number;
  max?: number;
  size?: number;
  className?: string;
}

export function HeatIndicator({ level, max = 5, size = 16, className }: HeatIndicatorProps) {
  if (level === 0) {
    return <span className={cn("text-xs text-brand-cream/50 font-medium", className)}>No Heat</span>;
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)} title={`Heat level: ${level}/${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Flame
          key={i}
          size={size}
          className={cn(
            "transition-colors",
            i < level ? "text-brand-red fill-brand-red" : "text-brand-cream/20"
          )}
        />
      ))}
    </div>
  );
}
