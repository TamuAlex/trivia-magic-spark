
import { ProcessedQuestion, QuizConfig } from './types';

export async function fetchQuizQuestions(config: QuizConfig): Promise<ProcessedQuestion[]> {
  const { amount, category, difficulty } = config;
  
  const url = new URL('https://opentdb.com/api.php');
  url.searchParams.append('amount', amount.toString());
  
  if (category !== 0) {
    url.searchParams.append('category', category.toString());
  }
  
  if (difficulty !== 'easy') {
    url.searchParams.append('difficulty', difficulty);
  }
  
  // Add type=multiple to only get multiple choice questions
  url.searchParams.append('type', 'multiple');
  
  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error(`API response code: ${data.response_code}`);
    }
    
    // Process and shuffle the questions
    return data.results.map((question: any, index: number): ProcessedQuestion => {
      // Decode HTML entities
      const decodedQuestion = decodeHTMLEntities(question.question);
      const decodedCorrectAnswer = decodeHTMLEntities(question.correct_answer);
      const decodedIncorrectAnswers = question.incorrect_answers.map(decodeHTMLEntities);
      
      // Combine all answers and shuffle them
      const all_answers = [...decodedIncorrectAnswers, decodedCorrectAnswer];
      shuffleArray(all_answers);
      
      return {
        ...question,
        id: index,
        question: decodedQuestion,
        correct_answer: decodedCorrectAnswer,
        incorrect_answers: decodedIncorrectAnswers,
        all_answers
      };
    });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
}

// Helper to decode HTML entities
function decodeHTMLEntities(text: string): string {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

// Helper to shuffle an array in place
function shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Fetch categories from the API
export async function fetchCategories() {
  try {
    const response = await fetch('https://opentdb.com/api_category.php');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
