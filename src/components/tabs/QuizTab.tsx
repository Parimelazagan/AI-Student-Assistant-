import { useState } from "react";
import { Brain, CheckCircle2, XCircle, RefreshCw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export function QuizTab() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      toast({
        title: "No topic",
        description: "Please enter a topic or paste notes to generate a quiz.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setQuestions([]);
    setSelectedAnswers({});
    setShowResults(false);

    // Simulated AI response for demo
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const demoQuestions: Question[] = [
      {
        id: 1,
        question: "What is the primary purpose of the concept discussed?",
        options: [
          "To increase complexity",
          "To improve efficiency and understanding",
          "To reduce functionality",
          "To eliminate processes",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which of the following is a key benefit mentioned?",
        options: [
          "Higher costs",
          "Slower processing",
          "Better organization and clarity",
          "More confusion",
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What approach is recommended for implementation?",
        options: [
          "Random application",
          "Systematic and structured approach",
          "Avoiding all methods",
          "Quick shortcuts only",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "According to the content, what leads to success?",
        options: [
          "Luck only",
          "Avoiding practice",
          "Consistent effort and learning",
          "Ignoring feedback",
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "What is the recommended final step?",
        options: [
          "Give up immediately",
          "Skip review entirely",
          "Review and apply learned concepts",
          "Forget everything",
        ],
        correctAnswer: 2,
      },
    ];

    setQuestions(demoQuestions);
    setIsLoading(false);

    toast({
      title: "Quiz generated!",
      description: "5 questions have been created. Good luck!",
    });
  };

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      toast({
        title: "Incomplete quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }
    setShowResults(true);
  };

  const getScore = () => {
    return questions.filter((q) => selectedAnswers[q.id] === q.correctAnswer).length;
  };

  const handleReset = () => {
    setQuestions([]);
    setSelectedAnswers({});
    setShowResults(false);
    setTopic("");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      {questions.length === 0 && (
        <Card className="shadow-card transition-all duration-300 hover:shadow-card-hover animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Generate Quiz
            </CardTitle>
            <CardDescription>
              Enter a topic or paste your notes to generate multiple-choice questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter a topic (e.g., 'Photosynthesis') or paste notes to generate quiz questions..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[150px] resize-none border-border/50 bg-muted/30 focus:bg-card transition-colors"
            />
            <Button
              onClick={handleGenerateQuiz}
              disabled={isLoading || !topic.trim()}
              className="w-full gradient-primary border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <Brain className="mr-2 h-4 w-4" />
              {isLoading ? "Generating..." : "Generate Quiz"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="shadow-card">
          <CardContent className="py-12">
            <LoadingSpinner text="Generating quiz questions..." />
          </CardContent>
        </Card>
      )}

      {/* Quiz Questions */}
      {questions.length > 0 && !isLoading && (
        <>
          {/* Score Card */}
          {showResults && (
            <Card className="border-primary/30 bg-primary/5 shadow-card animate-fade-in">
              <CardContent className="flex items-center justify-between py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary">
                    <Trophy className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {getScore()} / {questions.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Questions correct</p>
                  </div>
                </div>
                <Button onClick={handleReset} variant="outline" className="border-border/50">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  New Quiz
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((q, qIndex) => (
              <Card
                key={q.id}
                className="shadow-card transition-all duration-300 hover:shadow-card-hover animate-slide-up"
                style={{ animationDelay: `${qIndex * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
                      {q.id}
                    </span>
                    {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {q.options.map((option, oIndex) => {
                      const isSelected = selectedAnswers[q.id] === oIndex;
                      const isCorrect = q.correctAnswer === oIndex;
                      const showCorrectness = showResults;

                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleSelectAnswer(q.id, oIndex)}
                          disabled={showResults}
                          className={cn(
                            "flex items-center gap-3 rounded-lg border p-4 text-left transition-all duration-200",
                            !showResults && isSelected && "border-primary bg-primary/10",
                            !showResults && !isSelected && "border-border/50 hover:border-primary/50 hover:bg-muted/50",
                            showCorrectness && isCorrect && "border-success bg-success/10",
                            showCorrectness && isSelected && !isCorrect && "border-destructive bg-destructive/10"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                              isSelected && !showResults && "border-primary bg-primary text-primary-foreground",
                              !isSelected && !showResults && "border-border",
                              showCorrectness && isCorrect && "border-success bg-success text-success-foreground",
                              showCorrectness && isSelected && !isCorrect && "border-destructive bg-destructive text-destructive-foreground"
                            )}
                          >
                            {showCorrectness ? (
                              isCorrect ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : isSelected ? (
                                <XCircle className="h-4 w-4" />
                              ) : (
                                String.fromCharCode(65 + oIndex)
                              )
                            ) : (
                              String.fromCharCode(65 + oIndex)
                            )}
                          </span>
                          <span className="text-sm">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          {!showResults && (
            <Button
              onClick={handleSubmitQuiz}
              className="w-full gradient-primary border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
              size="lg"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Submit Quiz
            </Button>
          )}
        </>
      )}
    </div>
  );
}
