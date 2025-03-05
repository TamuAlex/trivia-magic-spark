
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { BlogNavigation } from "./blog/BlogNavigation";
import { ArticleHeader } from "./blog/ArticleHeader";
import { ArticleContent } from "./blog/ArticleContent";
import { RelatedArticles } from "./blog/RelatedArticles";
import { TestYourKnowledge } from "./blog/TestYourKnowledge";
import { useBlogPost } from "./blog/hooks/useBlogPost";

export default function BlogPost() {
  const { categoryName, postId } = useParams<{ categoryName: string; postId: string }>();
  const { loading, blogPost, formattedCategoryName } = useBlogPost(categoryName, postId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <BlogNavigation 
            categoryName={categoryName} 
            postTitle={blogPost?.title} 
            showBackToCategoryLink={true} 
          />
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
              <p className="mt-4 text-gray-600">Loading article...</p>
            </div>
          ) : blogPost && (
            <article>
              <ArticleHeader 
                title={blogPost.title}
                date={blogPost.date}
                author={blogPost.author}
                readTime={blogPost.readTime}
                category={formattedCategoryName}
              />
              
              <ArticleContent content={blogPost.content} />
              
              <RelatedArticles 
                articles={blogPost.relatedArticles} 
                categoryName={categoryName || ''} 
              />
              
              <TestYourKnowledge categoryName={formattedCategoryName} />
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
