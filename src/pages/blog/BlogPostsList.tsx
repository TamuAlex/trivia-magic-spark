
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, BookOpen } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

interface BlogPostsListProps {
  categoryName: string | undefined;
  posts: BlogPost[];
  loading: boolean;
}

export const BlogPostsList: React.FC<BlogPostsListProps> = ({ categoryName, posts, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
        <p className="mt-4 text-gray-600">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map(post => (
        <Card 
          key={post.id} 
          className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm mt-2">
              <span className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1 text-primary" />
                {post.date}
              </span>
              <span className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1 text-primary" />
                {post.readTime}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Link to={`/blog/category/${categoryName}/${post.id}`}>
              <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
                <BookOpen className="h-4 w-4 mr-2" />
                Read Article
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
