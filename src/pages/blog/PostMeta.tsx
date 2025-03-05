
import React from "react";
import { Calendar, Clock, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PostMetaProps {
  date: string;
  author: string;
  readTime: string;
  category: string;
}

export const PostMeta: React.FC<PostMetaProps> = ({ date, author, readTime, category }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
      <span className="flex items-center">
        <Calendar className="h-4 w-4 mr-1 text-primary" />
        {date}
      </span>
      <span className="flex items-center">
        <User className="h-4 w-4 mr-1 text-primary" />
        {author}
      </span>
      <span className="flex items-center">
        <Clock className="h-4 w-4 mr-1 text-primary" />
        {readTime}
      </span>
      <Badge variant="outline" className="flex items-center bg-primary/5 border-primary/20">
        <Tag className="h-3 w-3 mr-1" />
        {category}
      </Badge>
    </div>
  );
};
