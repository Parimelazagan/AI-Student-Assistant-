import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, User, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingDots } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "Explain binary search algorithm",
  "Best free courses for AI?",
  "Tips for effective studying",
  "How to prepare for coding interviews?",
];

export function ChatbotTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! 👋 I'm your AI study assistant. Ask me anything about your studies—explanations, course recommendations, study tips, or career advice. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulated AI response for demo
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const responses: Record<string, string> = {
      "binary search": "**Binary Search** is an efficient algorithm for finding an element in a sorted array.\n\n**How it works:**\n1. Compare the target with the middle element\n2. If target equals middle, we found it!\n3. If target is smaller, search the left half\n4. If target is larger, search the right half\n5. Repeat until found or array is exhausted\n\n**Time Complexity:** O(log n)\n**Space Complexity:** O(1) iterative, O(log n) recursive\n\n💡 **Tip:** Binary search requires a sorted array!",
      "ai courses": "Here are some **excellent free AI/ML courses:**\n\n📚 **Beginner:**\n• Andrew Ng's Machine Learning (Coursera)\n• Fast.ai - Practical Deep Learning\n• Google's Machine Learning Crash Course\n\n📚 **Intermediate:**\n• Deep Learning Specialization (Coursera)\n• Stanford CS229 (YouTube)\n• MIT 6.S191 - Intro to Deep Learning\n\n📚 **Resources:**\n• Kaggle Learn - Hands-on tutorials\n• Papers With Code - Latest research\n\n🎯 Start with Andrew Ng's course—it's the gold standard!",
      "study tips": "Here are **evidence-based study techniques:**\n\n🧠 **Active Recall:**\n• Test yourself instead of re-reading\n• Use flashcards (Anki is great!)\n\n⏰ **Spaced Repetition:**\n• Review material at increasing intervals\n• Don't cram—spread it out\n\n🍅 **Pomodoro Technique:**\n• 25 min focus, 5 min break\n• After 4 cycles, take a longer break\n\n📝 **Feynman Technique:**\n• Explain concepts in simple terms\n• If you can teach it, you know it\n\n💤 **Don't forget:** Sleep is essential for memory consolidation!",
      "coding interviews": "**Coding Interview Preparation Guide:**\n\n📊 **Data Structures to Master:**\n• Arrays, Strings, Hash Maps\n• Trees, Graphs, Heaps\n• Stacks, Queues, Linked Lists\n\n🔢 **Key Algorithms:**\n• Sorting (Quick, Merge, Heap)\n• BFS/DFS, Dynamic Programming\n• Two Pointers, Sliding Window\n\n🎯 **Practice Platforms:**\n• LeetCode (do top 100)\n• HackerRank, CodeSignal\n• Pramp (mock interviews)\n\n💡 **Tips:**\n• Practice 1-2 problems daily\n• Focus on understanding patterns\n• Talk through your thought process",
    };

    let responseContent = "That's a great question! Let me help you with that.\n\n";
    
    const lowerText = text.toLowerCase();
    if (lowerText.includes("binary search")) {
      responseContent = responses["binary search"];
    } else if (lowerText.includes("ai") || lowerText.includes("courses") || lowerText.includes("course")) {
      responseContent = responses["ai courses"];
    } else if (lowerText.includes("study") || lowerText.includes("tip")) {
      responseContent = responses["study tips"];
    } else if (lowerText.includes("interview") || lowerText.includes("coding")) {
      responseContent = responses["coding interviews"];
    } else {
      responseContent += "Based on your question, here are some key points to consider:\n\n• Break down the concept into smaller parts\n• Practice with examples\n• Connect it to what you already know\n• Teaching others helps solidify understanding\n\nWould you like me to explain any specific topic in more detail?";
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! 👋 I'm your AI study assistant. Ask me anything about your studies—explanations, course recommendations, study tips, or career advice. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <Card className="shadow-card h-[600px] flex flex-col">
      <CardHeader className="border-b border-border/50 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              AI Study Chatbot
            </CardTitle>
            <CardDescription>
              Ask study-related questions and get instant help
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.role === "user" ? "flex-row-reverse" : ""
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-md"
                      : "bg-muted text-foreground rounded-tl-md"
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-md bg-muted px-4 py-3">
                  <LoadingDots />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-accent/50 text-accent-foreground hover:bg-accent transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              placeholder="Ask anything about your studies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              className="flex-1 border-border/50 bg-muted/30 focus:bg-card transition-colors"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="gradient-primary border-0 shadow-card"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
