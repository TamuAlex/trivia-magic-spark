
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
import { Calendar, BookOpen, Clock, ArrowLeft, HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  
  // Generate blog posts for specific categories
  const generatePostsForCategory = (categoryName: string): BlogPost[] => {
    switch(categoryName) {
      case "general-knowledge":
        return [
          {
            id: 1,
            title: "10 Mind-Blowing General Knowledge Facts",
            excerpt: "Discover surprising facts that will make you sound like the smartest person in the room at your next social gathering.",
            date: "June 12, 2023",
            readTime: "5 min read"
          },
          {
            id: 2,
            title: "How to Build a Strong Foundation of General Knowledge",
            excerpt: "Learn effective techniques to expand your knowledge base across multiple domains with these proven strategies.",
            date: "May 3, 2023",
            readTime: "8 min read"
          }
        ];
      case "entertainment":
        return [
          {
            id: 1, 
            title: "The Evolution of Entertainment: From Radio to Streaming",
            excerpt: "Trace the fascinating journey of how entertainment has transformed over the decades and shaped modern culture.",
            date: "July 8, 2023",
            readTime: "7 min read"
          },
          {
            id: 2,
            title: "Hidden Easter Eggs in Popular Movies You Never Noticed",
            excerpt: "Uncover the secret references and inside jokes that filmmakers have hidden in your favorite blockbuster films.",
            date: "April 22, 2023",
            readTime: "6 min read"
          }
        ];
      case "science":
        return [
          {
            id: 1,
            title: "Breaking Down Complex Scientific Concepts for Trivia",
            excerpt: "Master the art of explaining quantum physics, genetics, and astronomy in simple terms that anyone can understand.",
            date: "June 30, 2023",
            readTime: "9 min read"
          },
          {
            id: 2,
            title: "Recent Scientific Breakthroughs You Should Know About",
            excerpt: "Stay up-to-date with the latest discoveries that are changing our understanding of the world and universe.",
            date: "March 15, 2023",
            readTime: "7 min read"
          }
        ];
      case "sport":
        return [
          {
            id: 1,
            title: "The Greatest Sporting Upsets in History",
            excerpt: "Relive the most unexpected victories that defied all odds and shocked the sporting world.",
            date: "May 27, 2023",
            readTime: "6 min read"
          },
          {
            id: 2,
            title: "Understanding the Rules of Obscure Sports",
            excerpt: "From sepak takraw to cheese rolling, expand your knowledge of lesser-known sports from around the world.",
            date: "February 18, 2023",
            readTime: "5 min read"
          }
        ];
      case "geography":
        return [
          {
            id: 1,
            title: "Memorizing World Capitals: Expert Techniques",
            excerpt: "Learn powerful memory methods that will help you recall any country's capital with ease.",
            date: "July 14, 2023",
            readTime: "6 min read"
          },
          {
            id: 2,
            title: "Surprising Border Anomalies Around the World",
            excerpt: "Discover strange geographical quirks, enclaves, and border oddities that challenge our understanding of territories.",
            date: "April 8, 2023",
            readTime: "7 min read"
          }
        ];
      case "animals":
        return [
          {
            id: 1,
            title: "Bizarre Animal Adaptations That Defy Explanation",
            excerpt: "From the platypus to the mantis shrimp, explore the strangest evolutionary developments in the animal kingdom.",
            date: "June 5, 2023",
            readTime: "5 min read"
          },
          {
            id: 2,
            title: "Endangered Species You've Never Heard Of",
            excerpt: "Learn about critically threatened animals that don't get the spotlight but are just as important to ecosystems.",
            date: "March 28, 2023",
            readTime: "6 min read"
          }
        ];
      case "history":
        return [
          {
            id: 1,
            title: "Forgotten Historical Figures Who Changed the World",
            excerpt: "Meet the unsung heroes and innovators whose contributions shaped our modern society but were erased from popular history.",
            date: "May 19, 2023",
            readTime: "8 min read"
          },
          {
            id: 2,
            title: "Common Historical Misconceptions Debunked",
            excerpt: "Separate fact from fiction and discover the truth behind widely believed historical myths.",
            date: "February 2, 2023",
            readTime: "7 min read"
          }
        ];
      case "art":
        return [
          {
            id: 1,
            title: "Recognizing Art Periods at a Glance",
            excerpt: "Train your eye to identify the distinctive characteristics of major art movements from Renaissance to Postmodernism.",
            date: "June 22, 2023",
            readTime: "6 min read"
          },
          {
            id: 2,
            title: "The Stories Behind Iconic Artworks",
            excerpt: "Delve into the fascinating histories, symbolism, and controversies of the world's most famous paintings and sculptures.",
            date: "March 9, 2023",
            readTime: "7 min read"
          }
        ];
      default:
        // Default posts for any other category
        return [
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
    }
  };

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

  // Get posts for the current category
  const categoryPosts = categoryName ? generatePostsForCategory(categoryName) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Add breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                  <HomeIcon className="h-4 w-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/blog">
                  Blog
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{formattedName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
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
                {categoryPosts.map(post => (
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
                      <Link to={`/blog/category/${categoryName}/${post.id}`}>
                        <Button variant="outline" className="gap-2">
                          <BookOpen className="h-4 w-4" />
                          Read Article
                        </Button>
                      </Link>
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
