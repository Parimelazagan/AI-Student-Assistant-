import { useState } from "react";
import { FileText, Sparkles, Copy, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function SummarizerTab() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!notes.trim()) {
      toast({
        title: "No content",
        description: "Please enter some notes to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary([]);

    try {
      const { data, error } = await supabase.functions.invoke("summarize", {
        body: { notes },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Parse the summary into bullet points
      const summaryText = data.summary as string;
      const points = summaryText
        .split("\n")
        .filter((line) => line.trim().startsWith("📌"))
        .map((line) => line.trim());

      // If no bullet points found, split by newlines and add emoji
      const finalPoints = points.length > 0 
        ? points 
        : summaryText.split("\n").filter((line) => line.trim()).map((line) => `📌 ${line.trim()}`);

      setSummary(finalPoints);

      toast({
        title: "Summary generated!",
        description: "Your notes have been summarized into key points.",
      });
    } catch (error) {
      console.error("Summarize error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to summarize notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Summary copied to clipboard.",
    });
  };

  const handleClear = () => {
    setNotes("");
    setSummary([]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Section */}
      <Card className="shadow-card transition-all duration-300 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Your Notes
          </CardTitle>
          <CardDescription>
            Paste or type your notes below. The AI will extract key points and create a concise summary.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your notes here... You can paste lecture notes, textbook content, or any study material you want to summarize."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[300px] resize-none border-border/50 bg-muted/30 focus:bg-card transition-colors"
          />
          <div className="flex gap-3">
            <Button
              onClick={handleSummarize}
              disabled={isLoading || !notes.trim()}
              className="flex-1 gradient-primary border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? "Summarizing..." : "Summarize Notes"}
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isLoading}
              className="border-border/50 hover:bg-muted/50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card className="shadow-card transition-all duration-300 hover:shadow-card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Summary
              </CardTitle>
              <CardDescription>
                Key points extracted from your notes
              </CardDescription>
            </div>
            {summary.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSpinner text="Analyzing your notes..." />
          ) : summary.length > 0 ? (
            <div className="space-y-3 animate-fade-in">
              {summary.map((point, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-accent/50 p-4 text-sm text-foreground border border-border/30 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {point}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Enter your notes and click "Summarize" to generate key points.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
