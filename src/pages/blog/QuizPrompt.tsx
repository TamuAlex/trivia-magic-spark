
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizPromptProps {
  categoryName: string;
}

export const QuizPrompt: React.FC<QuizPromptProps> = ({ categoryName }) => {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle>Want to test your {categoryName} knowledge?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Put your {categoryName.toLowerCase()} trivia skills to the test with our interactive quiz.
        </p>
        <Link to={`/?category=${categoryName.toLowerCase()}&amount=10&difficulty=medium`}>
          <Button>Take a Quiz Now</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
