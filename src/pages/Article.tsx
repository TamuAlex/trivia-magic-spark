import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleBySlug } from "@/articles";

export default function Article() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();

  const article = category && slug ? getArticleBySlug(category, slug) : undefined;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(`/blog/${category}`)}
        className="mb-4 btn-secondary"
      >
        ← Back to {category}
      </button>
      
      <div className="card-glass p-8">
        <div 
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="prose lg:prose-xl max-w-none"
        />
      </div>
    </div>
  );
} 