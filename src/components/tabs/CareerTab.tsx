import { useState } from "react";
import { Compass, GraduationCap, Target, BookOpen, FolderKanban, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { toast } from "@/hooks/use-toast";

interface RoadmapItem {
  phase: string;
  title: string;
  courses: string[];
  projects: string[];
}

export function CareerTab() {
  const [degree, setDegree] = useState("");
  const [semester, setSemester] = useState("");
  const [interest, setInterest] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const interests = [
    "Artificial Intelligence & ML",
    "Web Development",
    "Mobile Development",
    "Cybersecurity",
    "Cloud Computing",
    "Data Science",
    "DevOps",
    "Blockchain",
    "Game Development",
    "IoT & Embedded Systems",
  ];

  const handleGenerateRoadmap = async () => {
    if (!degree.trim() || !semester || !interest) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to generate your roadmap.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRoadmap([]);

    // Simulated AI response for demo
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const demoRoadmap: RoadmapItem[] = [
      {
        phase: "Foundation",
        title: "Build Core Skills",
        courses: [
          "Programming Fundamentals",
          "Data Structures & Algorithms",
          "Mathematics for CS",
        ],
        projects: [
          "Personal Portfolio Website",
          "Calculator App",
          "To-Do List Application",
        ],
      },
      {
        phase: "Intermediate",
        title: "Specialize & Practice",
        courses: [
          `${interest} Fundamentals`,
          "Software Engineering Principles",
          "Database Management",
        ],
        projects: [
          "Full-Stack Web Application",
          "API Development Project",
          "Collaborative Team Project",
        ],
      },
      {
        phase: "Advanced",
        title: "Master & Innovate",
        courses: [
          `Advanced ${interest}`,
          "System Design",
          "Industry Best Practices",
        ],
        projects: [
          "Open Source Contribution",
          "Capstone/Research Project",
          "Industry Internship",
        ],
      },
      {
        phase: "Career Ready",
        title: "Launch Your Career",
        courses: [
          "Technical Interview Prep",
          "Professional Development",
          "Emerging Technologies",
        ],
        projects: [
          "Portfolio Showcase",
          "Networking & Community",
          "Job Applications & Interviews",
        ],
      },
    ];

    setRoadmap(demoRoadmap);
    setIsLoading(false);

    toast({
      title: "Roadmap generated!",
      description: "Your personalized learning path is ready.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-card transition-all duration-300 hover:shadow-card-hover animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            Career Mentor
          </CardTitle>
          <CardDescription>
            Tell us about yourself and your interests. We'll create a personalized learning roadmap with courses and projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                Your Degree
              </label>
              <Input
                placeholder="e.g., Computer Science"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border-border/50 bg-muted/30 focus:bg-card transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Semester</label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="border-border/50 bg-muted/30 focus:bg-card transition-colors">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                Area of Interest
              </label>
              <Select value={interest} onValueChange={setInterest}>
                <SelectTrigger className="border-border/50 bg-muted/30 focus:bg-card transition-colors">
                  <SelectValue placeholder="Select interest" />
                </SelectTrigger>
                <SelectContent>
                  {interests.map((int) => (
                    <SelectItem key={int} value={int}>
                      {int}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleGenerateRoadmap}
            disabled={isLoading}
            className="w-full gradient-primary border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? "Creating..." : "Generate My Roadmap"}
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="shadow-card">
          <CardContent className="py-12">
            <LoadingSpinner text="Creating your personalized roadmap..." />
          </CardContent>
        </Card>
      )}

      {/* Roadmap Display */}
      {roadmap.length > 0 && !isLoading && (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/50 hidden md:block" />

          <div className="space-y-6">
            {roadmap.map((item, index) => (
              <div
                key={index}
                className="relative md:pl-16 animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 hidden md:flex h-5 w-5 items-center justify-center rounded-full gradient-primary shadow-glow">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                </div>

                <Card className="shadow-card transition-all duration-300 hover:shadow-card-hover">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Phase {index + 1}: {item.phase}
                      </span>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {item.title}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Courses */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <BookOpen className="h-4 w-4 text-primary" />
                          Recommended Courses
                        </h4>
                        <ul className="space-y-2">
                          {item.courses.map((course, cIndex) => (
                            <li
                              key={cIndex}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Projects */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <FolderKanban className="h-4 w-4 text-secondary-foreground" />
                          Suggested Projects
                        </h4>
                        <ul className="space-y-2">
                          {item.projects.map((project, pIndex) => (
                            <li
                              key={pIndex}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-secondary-foreground" />
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {roadmap.length === 0 && !isLoading && (
        <Card className="shadow-card">
          <CardContent className="flex min-h-[200px] flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Compass className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground max-w-md">
              Fill in your information above and click "Generate My Roadmap" to receive a personalized learning path.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
