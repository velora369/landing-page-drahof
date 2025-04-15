import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-[#425F70] to-[#731C13] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
