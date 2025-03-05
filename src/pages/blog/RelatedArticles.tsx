
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RelatedArticle {
  id: number;
  title: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  categoryName: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles, categoryName }) => {
  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map(article => (
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
  );
};
