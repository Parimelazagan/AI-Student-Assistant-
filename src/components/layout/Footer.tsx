import { Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-destructive animate-pulse-soft" />
            <span>using</span>
            <span className="font-semibold text-primary">Lovable AI + GPT</span>
            <Sparkles className="h-4 w-4 text-primary animate-pulse-soft" />
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 AI Student Assistant. Study smarter, achieve more.
          </p>
        </div>
      </div>
    </footer>
  );
}
