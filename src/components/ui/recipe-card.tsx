
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type Recipe = {
  id: string;
  title: string;
  description: string;
  preparationTime: string;
  cookingTime: string;
  servings: number;
  tags: string[];
  ingredients?: string[];
  instructions?: string[];
};

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
  onViewDetails?: (id: string) => void;
  onAddToGroceryList?: (id: string) => void;
  expanded?: boolean;
}

export function RecipeCard({
  recipe,
  className,
  onViewDetails,
  onAddToGroceryList,
  expanded = false,
}: RecipeCardProps) {
  return (
    <Card className={cn('recipe-card animate-fade-in', className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{recipe.title}</CardTitle>
        </div>
        <CardDescription className="text-sm mt-1">
          {recipe.preparationTime} prep · {recipe.cookingTime} cook · {recipe.servings} servings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <p className="text-sm text-muted-foreground">{recipe.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {expanded && recipe.ingredients && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-sm">Ingredients</h4>
            <ul className="space-y-1 text-sm pl-5 list-disc">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}

        {expanded && recipe.instructions && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-sm">Instructions</h4>
            <ol className="space-y-1 text-sm pl-5 list-decimal">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="ml-1 pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 pt-1">
        {!expanded && onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(recipe.id)}
            className="text-xs h-8"
          >
            View Recipe
          </Button>
        )}
        {onAddToGroceryList && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddToGroceryList(recipe.id)}
            className="text-xs h-8"
          >
            Add to Grocery List
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function RecipeList({ className }: { className?: string }) {
  const sampleRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Mediterranean Quinoa Bowl',
      description: 'Fresh and nutritious bowl with Mediterranean flavors',
      preparationTime: '15 min',
      cookingTime: '20 min',
      servings: 2,
      tags: ['Vegetarian', 'Mediterranean', 'High-Protein'],
      ingredients: [
        '1 cup quinoa, rinsed',
        '2 cups vegetable broth',
        '1 cucumber, diced',
        '1 cup cherry tomatoes, halved',
        '1/2 cup kalamata olives, pitted',
        '1/2 cup feta cheese, crumbled',
        '1/4 cup red onion, finely diced',
        '2 tbsp olive oil',
        '1 tbsp lemon juice',
        '1 tsp dried oregano',
        'Salt and pepper to taste',
      ],
      instructions: [
        'Cook quinoa in vegetable broth according to package instructions.',
        'While quinoa cooks, prepare vegetables and combine in a large bowl.',
        'Whisk together olive oil, lemon juice, oregano, salt, and pepper.',
        'Once quinoa is cooked and slightly cooled, add to the bowl with vegetables.',
        'Pour dressing over the salad and toss gently to combine.',
        'Top with crumbled feta cheese and serve at room temperature or chilled.',
      ],
    },
    {
      id: '2',
      title: 'Quick Chickpea Curry',
      description: 'Flavorful and protein-packed vegetarian curry',
      preparationTime: '10 min',
      cookingTime: '25 min',
      servings: 4,
      tags: ['Vegetarian', 'Indian', 'High-Protein'],
    },
    {
      id: '3',
      title: 'Avocado & Black Bean Wrap',
      description: 'Simple, nutritious lunch option ready in minutes',
      preparationTime: '10 min',
      cookingTime: '0 min',
      servings: 2,
      tags: ['Vegan', 'Mexican', 'Quick'],
    },
  ];

  const [expandedRecipe, setExpandedRecipe] = React.useState<string | null>(null);

  const handleViewDetails = (id: string) => {
    setExpandedRecipe(id === expandedRecipe ? null : id);
  };

  const handleAddToGroceryList = (id: string) => {
    console.log(`Added recipe ${id} to grocery list`);
    // In a real app, this would add ingredients to a grocery list
  };

  return (
    <div className={cn('space-y-6', className)}>
      <h2 className="text-lg font-semibold">Suggested Recipes</h2>
      <div className="space-y-4">
        {sampleRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onViewDetails={handleViewDetails}
            onAddToGroceryList={handleAddToGroceryList}
            expanded={recipe.id === expandedRecipe}
          />
        ))}
      </div>
    </div>
  );
}
