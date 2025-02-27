
import { ProcessedQuestion } from "@/lib/types";
import { Button } from "./Button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";

interface ResultsProps {
  questions: ProcessedQuestion[];
  score: number;
  onPlayAgain: () => void;
  onReset: () => void;
}

export function Results({ questions, score, onPlayAgain, onReset }: ResultsProps) {
  const percentage = (score / questions.length) * 100;
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect!";
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good job!";
    if (percentage >= 40) return "Nice try!";
    return "Keep practicing!";
  };
  
  return (
    <Card className="w-full max-w-2xl card-glass animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Quiz Results</CardTitle>
        <CardDescription className="text-center text-lg">
          {getMessage()}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3 text-center">
          <div className="text-3xl font-bold">
            {score} / {questions.length}
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="text-sm text-muted-foreground">
            {percentage.toFixed(0)}% correct
          </div>
        </div>
        
        <div className="space-y-4 pt-4">
          <h3 className="font-medium text-lg">Question Summary</h3>
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-secondary/50 space-y-2"
              >
                <div className="flex items-start gap-2">
                  {question.user_answer === question.correct_answer ? (
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{question.question}</p>
                    {question.user_answer !== question.correct_answer && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Your answer: <span className="text-red-500">{question.user_answer}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Correct answer: <span className="text-green-500">{question.correct_answer}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onPlayAgain}
          className="w-full sm:w-auto"
        >
          Play Again
        </Button>
        <Button
          variant="secondary"
          onClick={onReset}
          className="w-full sm:w-auto"
        >
          Change Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
