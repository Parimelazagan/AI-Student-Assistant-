import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";
import { SummarizerTab } from "@/components/tabs/SummarizerTab";
import { QuizTab } from "@/components/tabs/QuizTab";
import { PlannerTab } from "@/components/tabs/PlannerTab";
import { CareerTab } from "@/components/tabs/CareerTab";
import { ChatbotTab } from "@/components/tabs/ChatbotTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("summarizer");

  const renderTab = () => {
    switch (activeTab) {
      case "summarizer":
        return <SummarizerTab />;
      case "quiz":
        return <QuizTab />;
      case "planner":
        return <PlannerTab />;
      case "career":
        return <CareerTab />;
      case "chatbot":
        return <ChatbotTab />;
      default:
        return <SummarizerTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Hero />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="animate-fade-in" key={activeTab}>
          {renderTab()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
