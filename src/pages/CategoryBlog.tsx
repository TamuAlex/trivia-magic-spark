
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";
import { fetchCategories } from "@/lib/api";
import { Calendar, BookOpen, Clock, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export default function CategoryBlog() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Format the category name for display
  const formattedName = categoryName
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';
    
  // Mock blog posts data - in a real app, this would come from an API
  const mockPosts: BlogPost[] = [
    {
      id: 1,
      title: `Top 10 ${formattedName} Facts You Didn't Know`,
      excerpt: `Discover surprising and fascinating facts about ${formattedName.toLowerCase()} that will impress your friends at the next trivia night.`,
      date: "June 15, 2023",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: `A Beginner's Guide to ${formattedName} Trivia`,
      excerpt: `New to ${formattedName.toLowerCase()} trivia? This comprehensive guide will help you build a solid knowledge foundation.`,
      date: "May 28, 2023",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: `Mastering ${formattedName} Questions: Expert Tips`,
      excerpt: `Take your ${formattedName.toLowerCase()} knowledge to the next level with these proven strategies from trivia champions.`,
      date: "April 10, 2023",
      readTime: "6 min read"
    }
  ];

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const categories = await fetchCategories();
        const matchingCategory = categories.find(c => 
          c.name.toLowerCase().replace(/\s+/g, '-') === categoryName
        );
        setCategory(matchingCategory || null);
      } catch (error) {
        console.error("Failed to load category:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all categories
          </Link>
          
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{formattedName} Trivia</h1>
            <p className="text-lg text-gray-600">
              Explore our collection of articles, guides and resources about {formattedName.toLowerCase()} trivia.
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
              <p className="mt-4 text-gray-600">Loading content...</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-12">
                {mockPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-2xl">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Want to test your {formattedName} knowledge?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Put your {formattedName.toLowerCase()} trivia skills to the test with our interactive quiz.
                  </p>
                  <Link to={`/?category=${formattedName.toLowerCase()}&amount=10&difficulty=medium`}>
                    <Button>Take a Quiz Now</Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
