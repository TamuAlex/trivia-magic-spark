
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";
import { fetchCategories } from "@/lib/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";

export default function Blog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Define specific categories to display
  const specificCategories = [
    "General Knowledge", 
    "Entertainment", 
    "Science", 
    "Sport", 
    "Geography", 
    "Animals", 
    "History", 
    "Art"
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        // Filter for our specific categories if they exist in the API response
        // or create them if they don't exist
        const filteredCategories = specificCategories.map(name => {
          const existingCategory = fetchedCategories.find(
            c => c.name.toLowerCase() === name.toLowerCase()
          );
          return existingCategory || { id: Math.random() * 1000, name };
        });
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Failed to load categories:", error);
        // Create fallback categories if API fails
        setCategories(specificCategories.map((name, index) => ({ 
          id: index + 1,
          name
        })));
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Add breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Trivia Knowledge Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore fascinating articles, tips, and resources organized by category to enhance your trivia knowledge.
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                  <div className="h-2 bg-primary"></div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{category.name}</CardTitle>
                    <CardDescription>
                      Articles and resources about {category.name.toLowerCase()} trivia
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <p className="text-gray-600 mb-4 flex-grow">
                      Discover facts, quiz strategies, and expert insights related to {category.name.toLowerCase()}.
                    </p>
                    <Link 
                      to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="mt-auto"
                    >
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        View Articles
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-16 bg-secondary/20 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-gray-600">
              Stay updated with the latest trivia insights and quiz tips delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full sm:w-80 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
