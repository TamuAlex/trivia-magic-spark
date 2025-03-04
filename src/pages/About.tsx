
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">About Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to our Quiz App! We are passionate about creating an engaging and educational
            experience for quiz enthusiasts of all levels.
          </p>
          <p>
            Our mission is to provide a fun way to test your knowledge across various categories,
            from General Knowledge to Science, Entertainment, and beyond.
          </p>
          <p>
            This app uses the Open Trivia Database to offer thousands of verified questions
            across multiple categories and difficulty levels.
          </p>
          <p>
            Feel free to explore our blog for insights on different quiz categories and tips
            to improve your knowledge in specific areas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
