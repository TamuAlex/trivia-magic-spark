
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TestYourKnowledgeProps {
  categoryName: string;
}

export const TestYourKnowledge: React.FC<TestYourKnowledgeProps> = ({ categoryName }) => {
  return (
    <div className="mt-12 pt-8 border-t">
      <Link to={`/?category=${categoryName.toLowerCase()}&amount=10&difficulty=medium`}>
        <Card className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Test Your Knowledge</h3>
            <p className="mb-4 text-gray-600">
              Ready to put your {categoryName.toLowerCase()} knowledge to the test?
            </p>
            <Button>
              Take a Quiz Now
            </Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
