import { Link } from 'react-router-dom';

interface TriviaCategory {
  id: string;
  name: string;
  slug: string;
}

const categories: TriviaCategory[] = [
  { id: '1', name: 'General Knowledge', slug: 'general-knowledge' },
  { id: '2', name: 'History', slug: 'history' },
  { id: '3', name: 'Science & Nature', slug: 'science-nature' },
  { id: '4', name: 'Entertainment: Film', slug: 'entertainment-film' },
  { id: '5', name: 'Sports', slug: 'sports' },
];

const difficulties = ['easy', 'medium', 'hard'];
const amounts = [5, 10, 15, 20];

export function SitemapLinks() {
  return (
    // Hidden from view but accessible to crawlers
    <div className="sr-only" aria-hidden="true">
      <h2>All Trivia Options</h2>
      {categories.map((category) => (
        <div key={category.id}>
          {difficulties.map((difficulty) => (
            <div key={`${category.slug}-${difficulty}`}>
              {amounts.map((amount) => (
                <Link
                  key={`${category.slug}-${difficulty}-${amount}`}
                  to={`/?amount=${amount}&category=${category.slug}&difficulty=${difficulty}`}
                  tabIndex={-1}
                >
                  {amount} {category.name} Questions ({difficulty})
                </Link>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 