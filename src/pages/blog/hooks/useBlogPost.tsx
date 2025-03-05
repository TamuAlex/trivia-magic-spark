
import { useState, useEffect } from "react";

interface BlogPostContent {
  title: string;
  date: string;
  author: string;
  readTime: string;
  content: string[];
  relatedArticles: {
    id: number;
    title: string;
  }[];
}

export const useBlogPost = (categoryName: string | undefined, postId: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState<BlogPostContent | null>(null);
  
  // Format the category name for display
  const formattedCategoryName = categoryName
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  useEffect(() => {
    // Simulate fetching blog post data
    const fetchBlogPost = () => {
      setLoading(true);
      
      // Mock blog post data - in a real app, this would come from an API
      setTimeout(() => {
        const mockPost: BlogPostContent = {
          title: `${postId === '1' 
            ? `Top 10 ${formattedCategoryName} Facts You Didn't Know` 
            : postId === '2' 
            ? `A Beginner's Guide to ${formattedCategoryName} Trivia`
            : `Mastering ${formattedCategoryName} Questions: Expert Tips`}`,
          date: "June 15, 2023",
          author: "Alex Thompson",
          readTime: "8 min read",
          content: [
            `${formattedCategoryName} trivia is a fascinating subject that has captivated quiz enthusiasts for generations. Whether you're a seasoned trivia pro or just getting started, there's always something new to learn about this exciting topic.`,
            
            `One of the most interesting aspects of ${formattedCategoryName.toLowerCase()} knowledge is how it connects to so many other areas of study. Experts in the field often find themselves diving into related subjects to gain a deeper understanding of key concepts and historical developments.`,
            
            `When preparing for a ${formattedCategoryName.toLowerCase()} trivia competition, it's essential to focus on both breadth and depth of knowledge. The most successful competitors typically develop a systematic approach to learning, organizing information into categories that make sense for quick recall during high-pressure situations.`,
            
            `Recent research has shown that ${formattedCategoryName.toLowerCase()} trivia questions appear in approximately 15% of all general knowledge competitions, making it one of the most common categories. This prevalence highlights the cultural and educational significance of the subject matter.`,
            
            `For those looking to improve their ${formattedCategoryName.toLowerCase()} knowledge, we recommend starting with fundamental concepts before progressing to more specialized areas. This approach builds a solid foundation that makes learning advanced topics much easier.`,
            
            `Interactive learning methods have proven particularly effective for mastering ${formattedCategoryName.toLowerCase()} trivia. Engaging with the material through quizzes, discussions, and practical applications leads to better retention and understanding than passive reading alone.`,
            
            `As you continue your journey into ${formattedCategoryName.toLowerCase()} trivia, remember that curiosity and persistence are your greatest assets. The most accomplished experts are those who never stop asking questions and seeking new information.`
          ],
          relatedArticles: [
            { id: postId === '1' ? 2 : 1, title: postId === '1' ? `A Beginner's Guide to ${formattedCategoryName} Trivia` : `Top 10 ${formattedCategoryName} Facts You Didn't Know` },
            { id: postId === '3' ? 2 : 3, title: postId === '3' ? `A Beginner's Guide to ${formattedCategoryName} Trivia` : `Mastering ${formattedCategoryName} Questions: Expert Tips` }
          ]
        };
        
        setBlogPost(mockPost);
        setLoading(false);
      }, 800);
    };

    if (categoryName && postId) {
      fetchBlogPost();
    }
  }, [categoryName, postId, formattedCategoryName]);

  return { loading, blogPost, formattedCategoryName };
};
