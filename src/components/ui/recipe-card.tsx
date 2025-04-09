
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Recipe = {
  id: string;
  title: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  description: string;
  tags: string[];
};

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    description: 'Fresh, nutritious bowl with Mediterranean flavors',
    tags: ['Vegetarian', 'Mediterranean', 'High-Protein'],
  },
  {
    id: '2',
    title: 'Quick Chickpea Curry',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    description: 'Fast and protein-packed vegetarian curry',
    tags: ['Vegetarian', 'Indian', 'High-Protein'],
  },
  {
    id: '3',
    title: 'Avocado & Black Bean Wrap',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    description: 'Simple, nutritious lunch option ready in minutes',
    tags: ['Vegan', 'Mexican', 'Quick'],
  },
];

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  return (
    <div className={cn('bg-card border border-border rounded-lg overflow-hidden shadow-sm', className)}>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold">{recipe.title}</h3>
        <div className="flex items-center text-xs text-muted-foreground space-x-2">
          <span>{recipe.prepTime} min prep</span>
          <span>•</span>
          <span>{recipe.cookTime} min cook</span>
          <span>•</span>
          <span>{recipe.servings} servings</span>
        </div>
        <p className="text-sm">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {recipe.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between mt-4 pt-2">
          <Button variant="outline" size="sm">View Recipe</Button>
          <Button variant="secondary" size="sm">Add to Grocery List</Button>
        </div>
      </div>
    </div>
  );
}

export function RecipeList({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Suggested Recipes</h2>
      </div>
      <div className="grid gap-4">
        {SAMPLE_RECIPES.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
