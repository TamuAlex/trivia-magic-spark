
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
        <p className="mt-4 text-gray-600">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-12">
      {posts.map(post => (
        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{post.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Link to={`/blog/category/${categoryName}/${post.id}`}>
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Read Article
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
