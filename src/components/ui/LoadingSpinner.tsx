import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  text?: string;
}

export function LoadingSpinner({ className, text = "AI is thinking..." }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-8", className)}>
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse-soft">{text}</p>
    </div>
  );
}

export function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="space-y-4">
        <div className="h-4 w-3/4 rounded-md animate-shimmer" />
        <div className="h-4 w-full rounded-md animate-shimmer" />
        <div className="h-4 w-5/6 rounded-md animate-shimmer" />
        <div className="h-4 w-2/3 rounded-md animate-shimmer" />
      </div>
    </div>
  );
}
