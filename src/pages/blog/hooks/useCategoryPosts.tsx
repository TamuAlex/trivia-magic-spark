import { useState, useEffect } from "react";
import { Category } from "@/lib/types";
import { fetchCategories } from "@/lib/api";
import { generatePostsForCategory } from "@/lib/utils";

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

  const categoryPosts = categoryName ? generatePostsForCategory(formattedName.toLowerCase(), formattedName) : [];

  return { category, loading, formattedName, categoryPosts };
};
