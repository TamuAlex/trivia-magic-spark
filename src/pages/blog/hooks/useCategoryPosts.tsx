
import { useState, useEffect } from "react";
import { Category } from "@/lib/types";
import { fetchCategories } from "@/lib/api";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export const useCategoryPosts = (categoryName: string | undefined) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  
  const formattedName = categoryName
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const categories = await fetchCategories();
        const matchingCategory = categories.find(c => 
          c.name.toLowerCase().replace(/\s+/g, '-') === categoryName
        );
        setCategory(matchingCategory || null);
      } catch (error) {
        console.error("Failed to load category:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [categoryName]);

  // Generate mock posts for the category
  const generatePostsForCategory = (slug: string, name: string): BlogPost[] => {
    return [
      {
        id: 1,
        title: `Top 10 ${name} Facts You Didn't Know`,
        excerpt: `Discover fascinating and little-known facts about ${name.toLowerCase()} that will surprise even the most knowledgeable trivia enthusiasts.`,
        date: "June 15, 2023",
        readTime: "8 min read",
      },
      {
        id: 2,
        title: `A Beginner's Guide to ${name} Trivia`,
        excerpt: `New to ${name.toLowerCase()} trivia? This comprehensive guide will help you build a solid foundation and improve your quiz performance.`,
        date: "May 28, 2023",
        readTime: "12 min read",
      },
      {
        id: 3,
        title: `Mastering ${name} Questions: Expert Tips`,
        excerpt: `Take your ${name.toLowerCase()} knowledge to the next level with these professional strategies used by quiz champions.`,
        date: "April 10, 2023",
        readTime: "10 min read",
      }
    ];
  };

  const categoryPosts = categoryName ? generatePostsForCategory(categoryName, formattedName) : [];

  return { category, loading, formattedName, categoryPosts };
};
