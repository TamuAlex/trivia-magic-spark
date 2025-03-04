
import { useState, useCallback } from 'react';
import { QuizConfig, QuizState, ProcessedQuestion, Category } from '@/lib/types';
import { fetchQuizQuestions, fetchCategories } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_CONFIG: QuizConfig = {
  amount: 5,
  category: 0, // 0 means any category
  categoryName: 'any',
  difficulty: 'easy',
};

const INITIAL_STATE: QuizState = {
  status: 'idle',
  config: DEFAULT_CONFIG,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  categories: [], // Store categories for name/id conversion
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL_STATE);
  const { toast } = useToast();

  // Load categories when hook initializes
  const loadCategories = useCallback(async () => {
    try {
      const categories = await fetchCategories();
      setState(prev => ({
        ...prev,
        categories,
      }));
    } catch (error) {
      console.error("Failed to load categories for name mapping:", error);
    }
  }, []);

  // Initialize categories when hook is first used
  useState(() => {
    loadCategories();
  });

  // Helper function to convert between category name and ID
  const getCategoryIdByName = useCallback((name: string): number => {
    if (!name || name === 'any') return 0;
    
    const normalized = name.toLowerCase().replace(/\s+/g, '-');
    const category = state.categories.find(cat => 
      cat.name.toLowerCase().replace(/\s+/g, '-') === normalized
    );
    return category ? category.id : 0;
  }, [state.categories]);

  const getCategoryNameById = useCallback((id: number): string => {
    if (id === 0) return 'any';
    
    const category = state.categories.find(cat => cat.id === id);
    return category 
      ? category.name.toLowerCase().replace(/\s+/g, '-')
      : 'any';
  }, [state.categories]);

  const updateConfig = useCallback((config: Partial<QuizConfig>) => {
    setState(prev => {
      // If we're updating the category, also update the categoryName
      if (config.category !== undefined) {
        config.categoryName = getCategoryNameById(config.category);
      }
      // If we're updating categoryName, also update the category ID
      else if (config.categoryName !== undefined) {
        config.category = getCategoryIdByName(config.categoryName);
      }
      
      return {
        ...prev,
        config: { ...prev.config, ...config },
      };
    });
  }, [getCategoryIdByName, getCategoryNameById]);

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
    getCategoryIdByName,
    getCategoryNameById,
  };
}
