
import React from "react";
import { PostContent } from "./PostContent";
import { NewsletterSignup } from "./NewsletterSignup";

interface ArticleContentProps {
  content: string[];
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <div className="article-content">
      <PostContent paragraphs={content} />
      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
};
