import { useState } from "react";
import { Calendar, Clock, Plus, Trash2, Sparkles, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ScheduleItem {
  time: string;
  subject: string;
  duration: string;
  isBreak?: boolean;
}

export function PlannerTab() {
  const [studyHours, setStudyHours] = useState("");
  const [subjects, setSubjects] = useState<string[]>([""]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const handleRemoveSubject = (index: number) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = value;
    setSubjects(newSubjects);
  };

  const handleGenerateSchedule = async () => {
    const validSubjects = subjects.filter((s) => s.trim());
    const hours = parseFloat(studyHours);

    if (!hours || hours <= 0) {
      toast({
        title: "Invalid hours",
        description: "Please enter a valid number of study hours.",
        variant: "destructive",
      });
      return;
    }

    if (validSubjects.length === 0) {
      toast({
        title: "No subjects",
        description: "Please add at least one subject to study.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSchedule([]);

    // Simulated AI response for demo
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const generateSchedule = (): ScheduleItem[] => {
      const items: ScheduleItem[] = [];
      let currentHour = 9; // Start at 9 AM
      const studyBlockMinutes = 45;
      const breakMinutes = 15;
      let totalMinutes = hours * 60;
      let subjectIndex = 0;

      while (totalMinutes > 0) {
        // Add study block
        const studyTime = Math.min(studyBlockMinutes, totalMinutes);
        items.push({
          time: `${currentHour.toString().padStart(2, "0")}:00`,
          subject: validSubjects[subjectIndex % validSubjects.length],
          duration: `${studyTime} min`,
        });

        currentHour += 1;
        totalMinutes -= studyTime;
        subjectIndex++;

        // Add break if more study time remains
        if (totalMinutes > 0) {
          items.push({
            time: `${(currentHour - 1).toString().padStart(2, "0")}:45`,
            subject: "Short Break",
            duration: `${breakMinutes} min`,
            isBreak: true,
          });
        }
      }

      return items;
    };

    setSchedule(generateSchedule());
    setIsLoading(false);

    toast({
      title: "Schedule created!",
      description: "Your personalized study schedule is ready.",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Section */}
      <Card className="shadow-card transition-all duration-300 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Study Planner
          </CardTitle>
          <CardDescription>
            Enter your available study time and subjects. AI will create an optimized schedule with breaks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Study Hours */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Study Hours Per Day
            </label>
            <Input
              type="number"
              placeholder="e.g., 4"
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
              className="border-border/50 bg-muted/30 focus:bg-card transition-colors"
              min="0.5"
              max="12"
              step="0.5"
            />
          </div>

          {/* Subjects */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Subjects to Study</label>
            <div className="space-y-2">
              {subjects.map((subject, index) => (
                <div key={index} className="flex gap-2 animate-fade-in">
                  <Input
                    placeholder={`Subject ${index + 1}`}
                    value={subject}
                    onChange={(e) => handleSubjectChange(index, e.target.value)}
                    className="border-border/50 bg-muted/30 focus:bg-card transition-colors"
                  />
                  {subjects.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSubject(index)}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={handleAddSubject}
              className="w-full border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </div>

          <Button
            onClick={handleGenerateSchedule}
            disabled={isLoading}
            className="w-full gradient-primary border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? "Creating..." : "Generate Schedule"}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card className="shadow-card transition-all duration-300 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Your Daily Schedule
          </CardTitle>
          <CardDescription>
            Optimized study blocks with strategic breaks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSpinner text="Creating your schedule..." />
          ) : schedule.length > 0 ? (
            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 transition-all duration-200 animate-slide-up",
                    item.isBreak
                      ? "border-secondary bg-secondary/30"
                      : "border-border/30 bg-accent/30"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card shadow-sm">
                    {item.isBreak ? (
                      <Coffee className="h-5 w-5 text-secondary-foreground" />
                    ) : (
                      <Clock className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.time} • {item.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Enter your study hours and subjects to generate a personalized schedule.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
