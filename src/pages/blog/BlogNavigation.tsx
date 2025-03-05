
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogNavigationProps {
  categoryName?: string;
  postTitle?: string;
  showBackToCategoryLink?: boolean;
}

export const BlogNavigation: React.FC<BlogNavigationProps> = ({ 
  categoryName, 
  postTitle,
  showBackToCategoryLink = false 
}) => {
  const formattedCategoryName = categoryName
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/" className="flex items-center">
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/blog">Blog</Link>
          </BreadcrumbItem>
          {categoryName && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {postTitle ? (
                  <Link to={`/blog/category/${categoryName}`}>{formattedCategoryName}</Link>
                ) : (
                  <BreadcrumbPage>{formattedCategoryName}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </>
          )}
          {postTitle && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Article</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      
      {showBackToCategoryLink && categoryName && (
        <Link to={`/blog/category/${categoryName}`} className="inline-flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {formattedCategoryName} articles
        </Link>
      )}
    </>
  );
};
