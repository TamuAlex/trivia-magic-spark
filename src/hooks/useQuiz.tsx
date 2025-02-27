
import { useState, useCallback } from 'react';
import { QuizConfig, QuizState, ProcessedQuestion } from '@/lib/types';
import { fetchQuizQuestions } from '@/lib/api';
import { useToast } from '@/components/ui/toast';

const DEFAULT_CONFIG: QuizConfig = {
  amount: 5,
  category: 0, // 0 means any category
  difficulty: 'easy',
};

const INITIAL_STATE: QuizState = {
  status: 'idle',
  config: DEFAULT_CONFIG,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL_STATE);
  const { toast } = useToast();

  const updateConfig = useCallback((config: Partial<QuizConfig>) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, ...config },
    }));
  }, []);

  const startQuiz = useCallback(async () => {
    setState(prev => ({ ...prev, status: 'loading' }));
    
    try {
      const questions = await fetchQuizQuestions(state.config);
      
      setState(prev => ({
        ...prev,
        status: 'active',
        questions,
        currentQuestionIndex: 0,
        score: 0,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, status: 'idle' }));
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  }, [state.config, toast]);

  const answerQuestion = useCallback((answer: string) => {
    setState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const isCorrect = currentQuestion.correct_answer === answer;
      
      // Update the current question with the user's answer
      const updatedQuestions = [...prev.questions];
      updatedQuestions[prev.currentQuestionIndex] = {
        ...currentQuestion,
        user_answer: answer,
      };
      
      // Calculate new score
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      
      // Check if we've reached the end of the quiz
      const isLastQuestion = prev.currentQuestionIndex === prev.questions.length - 1;
      const newStatus = isLastQuestion ? 'completed' : 'active';
      
      return {
        ...prev,
        questions: updatedQuestions,
        score: newScore,
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        status: newStatus,
      };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    updateConfig,
    startQuiz,
    answerQuestion,
    resetQuiz,
  };
}
