
import React from "react";
import { Button } from "@/components/ui/button";

export const NewsletterSignup: React.FC = () => {
  return (
    <div className="mt-16 bg-secondary/20 p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Subscribe to Our Newsletter</h2>
      <p className="mb-6 text-gray-600">
        Stay updated with the latest trivia insights and quiz tips delivered directly to your inbox.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="flex h-10 w-full sm:w-80 rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
};
