
import React from "react";
import { PostMeta } from "./PostMeta";

interface ArticleHeaderProps {
  title: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  date,
  author,
  readTime,
  category
}) => {
  return (
    <header>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{title}</h1>
      <PostMeta 
        date={date}
        author={author}
        readTime={readTime}
        category={category}
      />
    </header>
  );
};
