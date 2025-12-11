import { BookOpen, Brain, Calendar, Compass, MessageCircle, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "summarizer", label: "Summarizer", icon: BookOpen },
  { id: "quiz", label: "Quiz", icon: Brain },
  { id: "planner", label: "Planner", icon: Calendar },
  { id: "career", label: "Career", icon: Compass },
  { id: "chatbot", label: "Chatbot", icon: MessageCircle },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-card">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">AI Student Assistant</h1>
              <p className="text-xs text-muted-foreground">Study smarter, not harder</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 rounded-full bg-muted/50 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-card text-primary shadow-card"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
