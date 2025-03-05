import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "General Knowledge", slug: "general" },
  { id: 2, name: "Entretainment", slug: "entretainment" },
  { id: 3, name: "Science", slug: "science" },
  { id: 4, name: "Sport", slug: "sport" },
  { id: 5, name: "Geography", slug: "geography" },
  { id: 6, name: "Animals", slug: "animals" },
  { id: 7, name: "History", slug: "history" },
  { id: 8, name: "Art", slug: "art" }
];

export function BlogCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/blog/${category.slug}`}
          className="card-glass p-6 hover-scale cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
          <p className="text-muted-foreground">
            Explore articles about {category.name.toLowerCase()}
          </p>
        </Link>
      ))}
    </div>
  );
} 