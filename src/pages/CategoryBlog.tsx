
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoryBlog() {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Format the category name for display
  const formattedName = categoryName
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  return (
    <div className="container mx-auto px-4">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{formattedName} Quizzes</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to {formattedName} Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This is where you'll find articles, tips, and resources related to {formattedName} quizzes.
              Stay tuned for upcoming content!
            </p>
          </CardContent>
        </Card>
        
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            We're working on adding articles for this category.
            Check back soon for interesting content about {formattedName}!
          </p>
        </div>
      </div>
    </div>
  );
}
