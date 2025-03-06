
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categories = [
  { id: 1, name: "General Knowledge", slug: "general", gradient: "from-blue-500 to-cyan-400" },
  { id: 2, name: "Entertainment", slug: "entertainment", gradient: "from-purple-500 to-pink-400" },
  { id: 3, name: "Science", slug: "science", gradient: "from-green-500 to-emerald-400" },
  { id: 4, name: "Sport", slug: "sport", gradient: "from-orange-500 to-amber-400" },
  { id: 5, name: "Geography", slug: "geography", gradient: "from-teal-500 to-cyan-400" },
  { id: 6, name: "Animals", slug: "animals", gradient: "from-rose-500 to-pink-400" },
  { id: 7, name: "History", slug: "history", gradient: "from-indigo-500 to-blue-400" },
  { id: 8, name: "Art", slug: "art", gradient: "from-violet-500 to-purple-400" }
];

export function BlogCategories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 animate-fade-in">
              Explore Our Trivia Categories
            </h1>
            <p className="text-lg text-gray-600 animate-slide-up">
              Dive into fascinating articles and insights across various topics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/blog/${category.slug}`}
              >
                <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className={cn(
                    "absolute inset-0 opacity-10 bg-gradient-to-br",
                    category.gradient
                  )} />
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Explore articles about {category.name.toLowerCase()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
