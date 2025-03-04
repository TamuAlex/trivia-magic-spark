
import { Link } from "react-router-dom";
import { useQuiz } from "@/hooks/useQuiz";
import { Button } from "@/components/ui/button";
import { Home, Info, BookOpen } from "lucide-react";

export function Header() {
  const { state } = useQuiz();
  
  return (
    <header className="w-full border-b mb-6">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Home className="h-5 w-5" />
          <Link to="/" className="text-xl font-bold">Quiz App</Link>
        </div>
        
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <Info className="h-4 w-4" />
            <span>About Us</span>
          </Link>
          <Link to="/blog" className="flex items-center space-x-1 hover:text-primary transition-colors">
            <BookOpen className="h-4 w-4" />
            <span>Blog</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
