
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Category } from "@/lib/types";
import { fetchCategories } from "@/lib/api";
import { BlogNavigation } from "./blog/BlogNavigation";
import { CategoryList } from "./blog/CategoryList";
import { NewsletterSignup } from "./blog/NewsletterSignup";

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
          <BlogNavigation />
          
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Trivia Knowledge Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore fascinating articles, tips, and resources organized by category to enhance your trivia knowledge.
            </p>
          </div>
          
          <CategoryList categories={categories} loading={loading} />
          
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
