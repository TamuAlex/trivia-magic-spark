
import { useEffect, useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { Button } from "@/components/Button";
import { QuizConfig } from "@/components/QuizConfig";
import { Question } from "@/components/Question";
import { Results } from "@/components/Results";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const { state, updateConfig, startQuiz, answerQuestion, resetQuiz } = useQuiz();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderContent = () => {
    switch (state.status) {
      case 'idle':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-block mb-2">
                <div className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">
                  Test Your Knowledge
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Trivia Magic
              </h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Challenge yourself with trivia questions from various categories and difficulty levels
              </p>
            </motion.div>
            
            <div className="flex justify-center">
              <QuizConfig 
                config={state.config}
                onConfigChange={updateConfig}
                onStart={startQuiz}
              />
            </div>
          </div>
        );
        
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg">Loading quiz questions...</p>
          </div>
        );
        
      case 'active':
        const currentQuestion = state.questions[state.currentQuestionIndex];
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col items-center">
              <div className="w-full mb-8 flex items-center justify-between">
                <Button variant="ghost" onClick={resetQuiz}>
                  ← Back to menu
                </Button>
                <div className="font-medium">
                  Question {state.currentQuestionIndex + 1} of {state.questions.length}
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  <Question 
                    question={currentQuestion} 
                    onAnswer={answerQuestion}
                    showFeedback={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        );
        
      case 'completed':
        return (
          <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <Results 
              questions={state.questions}
              score={state.score}
              onPlayAgain={startQuiz}
              onReset={resetQuiz}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col">
      {renderContent()}
      <Toaster />
    </div>
  );
};

export default Index;
