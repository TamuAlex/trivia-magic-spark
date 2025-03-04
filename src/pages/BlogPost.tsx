
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { 
  Card, 
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, User, BookOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPostContent {
  title: string;
  date: string;
  author: string;
  readTime: string;
  content: string[];
  relatedArticles: {
    id: number;
    title: string;
  }[];
}

export default function BlogPost() {
  const { categoryName, postId } = useParams<{ categoryName: string; postId: string }>();
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState<BlogPostContent | null>(null);
  
  // Format the category name for display
  const formattedCategoryName = categoryName
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  useEffect(() => {
    // Simulate fetching blog post data
    const fetchBlogPost = () => {
      setLoading(true);
      
      // Mock blog post data - in a real app, this would come from an API
      setTimeout(() => {
        const mockPost: BlogPostContent = {
          title: `${postId === '1' 
            ? `Top 10 ${formattedCategoryName} Facts You Didn't Know` 
            : postId === '2' 
            ? `A Beginner's Guide to ${formattedCategoryName} Trivia`
            : `Mastering ${formattedCategoryName} Questions: Expert Tips`}`,
          date: "June 15, 2023",
          author: "Alex Thompson",
          readTime: "8 min read",
          content: [
            `${formattedCategoryName} trivia is a fascinating subject that has captivated quiz enthusiasts for generations. Whether you're a seasoned trivia pro or just getting started, there's always something new to learn about this exciting topic.`,
            
            `One of the most interesting aspects of ${formattedCategoryName.toLowerCase()} knowledge is how it connects to so many other areas of study. Experts in the field often find themselves diving into related subjects to gain a deeper understanding of key concepts and historical developments.`,
            
            `When preparing for a ${formattedCategoryName.toLowerCase()} trivia competition, it's essential to focus on both breadth and depth of knowledge. The most successful competitors typically develop a systematic approach to learning, organizing information into categories that make sense for quick recall during high-pressure situations.`,
            
            `Recent research has shown that ${formattedCategoryName.toLowerCase()} trivia questions appear in approximately 15% of all general knowledge competitions, making it one of the most common categories. This prevalence highlights the cultural and educational significance of the subject matter.`,
            
            `For those looking to improve their ${formattedCategoryName.toLowerCase()} knowledge, we recommend starting with fundamental concepts before progressing to more specialized areas. This approach builds a solid foundation that makes learning advanced topics much easier.`,
            
            `Interactive learning methods have proven particularly effective for mastering ${formattedCategoryName.toLowerCase()} trivia. Engaging with the material through quizzes, discussions, and practical applications leads to better retention and understanding than passive reading alone.`,
            
            `As you continue your journey into ${formattedCategoryName.toLowerCase()} trivia, remember that curiosity and persistence are your greatest assets. The most accomplished experts are those who never stop asking questions and seeking new information.`
          ],
          relatedArticles: [
            { id: postId === '1' ? 2 : 1, title: postId === '1' ? `A Beginner's Guide to ${formattedCategoryName} Trivia` : `Top 10 ${formattedCategoryName} Facts You Didn't Know` },
            { id: postId === '3' ? 2 : 3, title: postId === '3' ? `A Beginner's Guide to ${formattedCategoryName} Trivia` : `Mastering ${formattedCategoryName} Questions: Expert Tips` }
          ]
        };
        
        setBlogPost(mockPost);
        setLoading(false);
      }, 800);
    };

    if (categoryName && postId) {
      fetchBlogPost();
    }
  }, [categoryName, postId, formattedCategoryName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link to={`/blog/category/${categoryName}`} className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {formattedCategoryName} articles
          </Link>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
              <p className="mt-4 text-gray-600">Loading article...</p>
            </div>
          ) : blogPost && (
            <article>
              <h1 className="text-4xl font-bold mb-6 text-gray-900">{blogPost.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-primary" />
                  {blogPost.date}
                </span>
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1 text-primary" />
                  {blogPost.author}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-primary" />
                  {blogPost.readTime}
                </span>
                <Badge variant="outline" className="flex items-center bg-primary/5 border-primary/20">
                  <Tag className="h-3 w-3 mr-1" />
                  {formattedCategoryName}
                </Badge>
              </div>
              
              <div className="prose prose-lg max-w-none">
                {blogPost.content.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {blogPost.relatedArticles.map(article => (
                    <Link key={article.id} to={`/blog/category/${categoryName}/${article.id}`}>
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <h3 className="text-lg font-semibold">{article.title}</h3>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Read Article
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t">
                <Link to={`/?category=${formattedCategoryName.toLowerCase()}&amount=10&difficulty=medium`}>
                  <Card className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Test Your Knowledge</h3>
                      <p className="mb-4 text-gray-600">
                        Ready to put your {formattedCategoryName.toLowerCase()} knowledge to the test?
                      </p>
                      <Button>
                        Take a Quiz Now
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
