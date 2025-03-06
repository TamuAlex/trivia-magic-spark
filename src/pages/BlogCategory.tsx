
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByCategory } from "@/articles";
import { Header } from "@/components/Header";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbList, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from "@/components/ui/breadcrumb";

export default function BlogCategory() {
  const { category } = useParams<{ category: string }>();
  const articles = category ? getArticlesByCategory(category) : [];

  const formattedCategory = category ? category.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') : '';

  if (!articles.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800">Category not found</h2>
            <p className="mt-4 text-gray-600">The category you're looking for doesn't exist or has no articles.</p>
            <Link to="/blog" className="mt-6 inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/blog" className="text-primary hover:text-primary/80 transition-colors">
                  Blog
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{formattedCategory}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 animate-fade-in">{formattedCategory} Articles</h1>
            <p className="text-lg text-gray-600 animate-slide-up">
              Explore our collection of articles and resources about {formattedCategory.toLowerCase()}.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${category}/${article.slug}`}
              >
                <Card className="h-full group hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-100">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button variant="outline" className="group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                Back to All Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
