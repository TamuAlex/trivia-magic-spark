
import { useState, useEffect } from 'react';
import type { Category, QuizConfig as QuizConfigType, Difficulty } from '@/lib/types';
import { fetchCategories } from '@/lib/api';
import { Button } from './Button';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface QuizConfigProps {
  config: QuizConfigType;
  onConfigChange: (config: Partial<QuizConfigType>) => void;
  onStart: () => void;
}

export function QuizConfig({ config, onConfigChange, onStart }: QuizConfigProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCategories();
        // Sort categories alphabetically by name
        const sortedCategories = [...data].sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load categories. Using default options.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [toast]);

  return (
    <Card className="w-full max-w-lg card-glass animate-scale-in">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-medium">Quiz Settings</CardTitle>
          <CardDescription>
            Customize your trivia experience
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Number of Questions</Label>
          <Input
            id="amount"
            type="number"
            min={1}
            max={20}
            value={config.amount}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val >= 1 && val <= 20) {
                onConfigChange({ amount: val });
              }
            }}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={config.category.toString()}
            onValueChange={(value) => onConfigChange({ category: parseInt(value) })}
            disabled={isLoading || categories.length === 0}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectScrollUpButton />
              <SelectItem value="0">Any Category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
              <SelectScrollDownButton />
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={config.difficulty}
            onValueChange={(value) => onConfigChange({ difficulty: value as Difficulty })}
          >
            <SelectTrigger id="difficulty" className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectScrollUpButton />
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectScrollDownButton />
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onStart} 
          className="w-full hover-scale"
          disabled={isLoading}
        >
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}
