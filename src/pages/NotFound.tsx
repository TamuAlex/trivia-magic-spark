
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      
      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6">The page you are looking for does not exist.</p>
        <Link to="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
