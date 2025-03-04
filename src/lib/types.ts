
export interface Category {
  id: number;
  name: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizConfig {
  amount: number;
  category: number;
  categoryName: string; // Add the category name for URL usage
  difficulty: Difficulty;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ProcessedQuestion extends Question {
  id: number;
  all_answers: string[];
  user_answer?: string;
}

export interface QuizState {
  status: 'idle' | 'loading' | 'active' | 'completed';
  config: QuizConfig;
  questions: ProcessedQuestion[];
  currentQuestionIndex: number;
  score: number;
  categories: Category[]; // Add categories to state
}
