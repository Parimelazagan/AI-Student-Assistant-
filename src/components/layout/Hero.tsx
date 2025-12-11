import { Sparkles, BookOpen, Brain, Rocket } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero py-12 md:py-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-card animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary animate-pulse-soft" />
            <span className="text-sm font-medium text-foreground">Your Personal AI Study Companion</span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-slide-up">
            AI Student{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Assistant
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Your personal AI for studying smarter. Summarize notes, generate quizzes, 
            plan your schedule, and get career guidance—all in one place.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Smart Summaries</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI Quizzes</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Career Roadmaps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
