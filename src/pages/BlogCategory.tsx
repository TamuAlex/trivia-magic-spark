import React from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByCategory } from "@/articles";

export default function BlogCategory() {
  const { category } = useParams<{ category: string }>();
  const articles = category ? getArticlesByCategory(category) : [];

  if (!articles.length) {
    return <div>Category not found or no articles available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${category}/${article.slug}`}
            className="card-glass p-6 hover-scale"
          >
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-muted-foreground">
              Read more →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
} 