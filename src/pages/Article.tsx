import React from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleBySlug } from "@/articles";
import { Header } from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbList, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from "@/components/ui/breadcrumb";
import { SEOHead } from "@/components/SEOHead";

export default function Article() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  
  const article = category && slug ? getArticleBySlug(category, slug) : undefined;
  
  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800">Article not found</h2>
            <p className="mt-4 text-gray-600">The article you're looking for doesn't exist or has been moved.</p>
            <Link to="/blog" className="mt-6 inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const formattedCategory = category.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SEOHead
        title={`${category?.charAt(0).toUpperCase()}${category?.slice(1)} Trivia | Generate Trivia`}
        description={`Explore our comprehensive guide about ${category} trivia. Learn interesting facts, quiz tips, and enhance your knowledge in ${category}.`}
        canonicalUrl={`/blog/${category}/${slug}`}
        type="article"
      />
      
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/blog" className="text-primary hover:text-primary/80 transition-colors">
                  Blog
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to={`/blog/${category}`} className="text-primary hover:text-primary/80 transition-colors">
                  {formattedCategory}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Link 
            to={`/blog/${category}`}
            className="inline-flex items-center text-primary hover:underline mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {formattedCategory} articles
          </Link>
          
          <article className="card-glass p-8 border border-gray-100 shadow-sm animate-fade-in rounded-lg">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{article.title}</h1>
            
            <div 
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="prose lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
            />
          </article>
        </div>
      </div>
    </div>
  );
}
