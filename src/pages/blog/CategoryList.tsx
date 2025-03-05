
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
        <p className="mt-4 text-gray-600">Loading categories...</p>
      </div>
    );
  }

  return (
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
  );
};
