
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { QuizConfig } from "@/components/QuizConfig";
import { Question } from "@/components/Question";
import { Results } from "@/components/Results";
import { useQuiz } from "@/hooks/useQuiz";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, updateConfig, startQuiz, answerQuestion, resetQuiz } = useQuiz();

  useEffect(() => {
    // Read config from URL parameters on initial load
    const amount = searchParams.get('amount');
    const categoryName = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');

    if (amount && categoryName && difficulty) {
      updateConfig({
        amount: parseInt(amount),
        categoryName: categoryName,
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
      });
    }
  }, [searchParams, updateConfig]);

  const startQuizWithUrlUpdate = () => {
    // Update URL parameters when starting the quiz
    setSearchParams({
      amount: state.config.amount.toString(),
      category: state.config.categoryName,
      difficulty: state.config.difficulty,
    });
    startQuiz();
  };

  return (
    <div className="container mx-auto px-4">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        {state.status === 'idle' && (
          <QuizConfig
            config={state.config}
            categories={state.categories}
            onConfigChange={updateConfig}
            onStartQuiz={startQuizWithUrlUpdate}
          />
        )}

        {state.status === 'loading' && (
          <div className="text-center py-10">Loading questions...</div>
        )}

        {state.status === 'active' && state.questions.length > 0 && (
          <Question
            question={state.questions[state.currentQuestionIndex]}
            questionNumber={state.currentQuestionIndex + 1}
            totalQuestions={state.config.amount}
            onAnswer={answerQuestion}
          />
        )}

        {state.status === 'completed' && state.questions.length > 0 && (
          <Results
            questions={state.questions}
            score={state.score}
            onReset={resetQuiz}
          />
        )}
      </div>
    </div>
  );
}
