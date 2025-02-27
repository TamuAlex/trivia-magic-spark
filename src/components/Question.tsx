
import { useState } from "react";
import { ProcessedQuestion } from "@/lib/types";
import { Button } from "./Button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface QuestionProps {
  question: ProcessedQuestion;
  onAnswer: (answer: string) => void;
  showFeedback?: boolean;
}

export function Question({ question, onAnswer, showFeedback = false }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  
  const handleSelectAnswer = (answer: string) => {
    if (showingFeedback) return;
    setSelectedAnswer(answer);
  };
  
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    if (showFeedback) {
      setShowingFeedback(true);
      setAnswerSubmitted(true);
      // We no longer auto-advance to the next question
    } else {
      onAnswer(selectedAnswer);
    }
  };
  
  const handleNextQuestion = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };
  
  const getAnswerClassName = (answer: string) => {
    if (!showingFeedback) {
      return selectedAnswer === answer 
        ? "bg-primary/10 border-primary" 
        : "bg-card hover:bg-secondary/50";
    }
    
    if (answer === question.correct_answer) {
      return "bg-green-100 border-green-500 text-green-800";
    }
    
    if (selectedAnswer === answer && answer !== question.correct_answer) {
      return "bg-red-100 border-red-500 text-red-800";
    }
    
    return "bg-card opacity-50";
  };

  return (
    <Card className="w-full max-w-xl card-glass animate-slide-up">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-1">
          <Badge variant="outline" className={`${getDifficultyColor(question.difficulty)} capitalize`}>
            {question.difficulty}
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {question.category}
          </Badge>
        </div>
        <CardTitle className="text-xl font-medium tracking-tight">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {question.all_answers.map((answer, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className={`w-full text-left p-4 rounded-lg border transition-all ${getAnswerClassName(answer)}`}
                onClick={() => handleSelectAnswer(answer)}
                disabled={showingFeedback}
              >
                {answer}
              </button>
            </motion.div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {answerSubmitted && showingFeedback ? (
          <Button
            onClick={handleNextQuestion}
            className="w-full"
          >
            Next Question
          </Button>
        ) : (
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer || showingFeedback}
            className="w-full"
          >
            Submit Answer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
