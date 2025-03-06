
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface QuizPromptProps {
  categoryName: string;
}

export const QuizPrompt: React.FC<QuizPromptProps> = ({ categoryName }) => {
  return (
    <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-2xl">Want to test your {categoryName} knowledge?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          Put your {categoryName.toLowerCase()} trivia skills to the test with our interactive quiz.
          Challenge yourself and learn something new!
        </p>
        <Link to={`/?category=${categoryName.toLowerCase()}&amount=10&difficulty=medium`}>
          <Button className="group">
            <Brain className="h-5 w-5 mr-2 group-hover:animate-bounce" />
            Take a Quiz Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
