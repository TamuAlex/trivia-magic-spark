
import React from "react";

interface PostContentProps {
  paragraphs: string[];
}

export const PostContent: React.FC<PostContentProps> = ({ paragraphs }) => {
  return (
    <div className="prose prose-lg max-w-none">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-6 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  );
};
