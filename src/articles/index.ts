import { article as triviaArticle } from './general/trivia-tips';
import { article as movieArticle } from './entertainment/movie-trivia';
import { article as scienceArticle } from './science/amazing-discoveries';
import { article as sportArticle } from './sport/olympic-history';
import { article as geographyArticle } from './geography/world-wonders';
import { article as animalsArticle } from './animals/endangered-species';
import { article as historyArticle } from './history/ancient-civilizations';
import { article as historyTriviaGenerator } from './history/history-trivia-generator';
import { article as artArticle } from './art/renaissance-masters';

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
}

const allArticles: Article[] = [
  triviaArticle,
  movieArticle,
  scienceArticle,
  sportArticle,
  geographyArticle,
  animalsArticle,
  historyArticle,
  historyTriviaGenerator,
  artArticle
];

export const getArticlesByCategory = (category: string): Article[] => {
  return allArticles.filter(article => article.category === category);
};

export const getArticleBySlug = (category: string, slug: string): Article | undefined => {
  return allArticles.find(article => article.category === category && article.slug === slug);
}; 