
import { Header } from "@/components/Header";
import { BlogNavigation } from "./blog/BlogNavigation";
import { BlogPostsList } from "./blog/BlogPostsList";
import { QuizPrompt } from "./blog/QuizPrompt";
import { useCategoryPosts } from "./blog/hooks/useCategoryPosts";
import { useParams } from "react-router-dom";

export default function CategoryBlog() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { loading, formattedName, categoryPosts } = useCategoryPosts(categoryName);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <BlogNavigation categoryName={categoryName} />
          
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{formattedName} Trivia</h1>
            <p className="text-lg text-gray-600">
              Explore our collection of articles, guides and resources about {formattedName.toLowerCase()} trivia.
            </p>
          </div>
          
          <BlogPostsList 
            categoryName={categoryName} 
            posts={categoryPosts} 
            loading={loading} 
          />
          
          <QuizPrompt categoryName={formattedName} />
        </div>
      </div>
    </div>
  );
}
