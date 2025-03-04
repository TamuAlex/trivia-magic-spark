
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Category } from "@/lib/types";
import { fetchCategories } from "@/lib/api";

export default function Blog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Quiz Blog</h1>
        <p className="mb-8">
          Explore our blog posts organized by category to learn more about each topic and improve your knowledge.
        </p>
        
        {loading ? (
          <div className="text-center py-10">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="h-full">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>
                    Articles and tips about {category.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link 
                    to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-primary hover:underline"
                  >
                    View all articles →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
