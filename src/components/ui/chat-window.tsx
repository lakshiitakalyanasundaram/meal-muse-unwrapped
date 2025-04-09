
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PromptForm } from '@/components/ui/prompt-form';
import { AvatarIcon } from '@/components/ui/avatar-icon';
import { cn } from '@/lib/utils';
import { RecipeList } from './recipe-card';
import { PreferencesSection } from './preference-selector';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "👋 Hi there! I'm your meal planning assistant. I can help you plan meals, create grocery lists, suggest recipes based on your preferences, and offer tips for using leftovers. What would you like help with today?",
    timestamp: new Date(),
  },
];

interface ChatWindowProps {
  className?: string;
}

export function ChatWindow({ className }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Sample responses for demo purposes
  const sampleResponses: { [key: string]: string } = {
    default: "I can help you plan meals based on your preferences, dietary restrictions, and what you have available. Would you like me to suggest some recipes?",
    "meal ideas": "I'd be happy to suggest some meal ideas! Are you looking for something specific like quick weeknight dinners, meal prep options, or something else? Do you have any dietary preferences I should know about?",
    "vegetarian": "Here are some vegetarian meal ideas I think you might enjoy:\n\n1. Mediterranean Quinoa Bowl with roasted vegetables\n2. Creamy Coconut Curry with chickpeas and vegetables\n3. Black Bean and Sweet Potato Enchiladas\n4. Lentil Bolognese with whole grain pasta\n\nWould you like me to provide a complete recipe for any of these?",
    "grocery list": "I'd be happy to help you create a grocery list! To make it most efficient, I can organize it by store sections. Would you like me to create a list based on specific recipes or help you plan a full week of meals?",
    "leftover": "Great question about leftovers! Here are some ideas:\n\n1. Leftover roast chicken can become chicken salad, soup, or tacos\n2. Extra rice works well in fried rice, stuffed peppers, or rice pudding\n3. Vegetable scraps can be frozen for homemade stock\n4. Stale bread makes excellent croutons, breadcrumbs, or bread pudding\n\nDo you have specific leftovers you're trying to use up?",
    "substitute": "I'd be happy to suggest ingredient substitutions! Some common ones:\n\n• No buttermilk? Use milk with 1 tbsp lemon juice or vinegar\n• No eggs for baking? Try applesauce, mashed banana, or flax eggs\n• No fresh herbs? Use 1/3 the amount of dried herbs\n• No breadcrumbs? Try crushed crackers, cornflakes, or oats\n\nIs there a specific ingredient you need to substitute?",
  };

  // Function to handle message submission
  const handleSubmit = (value: string) => {
    const userMessage: Message = {
      id: String(Date.now()),
      role: 'user',
      content: value,
      timestamp: new Date(),
    };
    
    setMessages((current) => [...current, userMessage]);
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Check for keywords to provide relevant responses
      let responseText = sampleResponses.default;
      const lowerValue = value.toLowerCase();
      
      if (lowerValue.includes('recipe') || lowerValue.includes('meal idea') || lowerValue.includes('dinner')) {
        responseText = sampleResponses["meal ideas"];
        setShowRecipes(true);
        setShowPreferences(true);
      } else if (lowerValue.includes('vegetarian') || lowerValue.includes('vegan')) {
        responseText = sampleResponses["vegetarian"];
        setShowRecipes(true);
        setShowPreferences(true);
      } else if (lowerValue.includes('grocery') || lowerValue.includes('shopping list')) {
        responseText = sampleResponses["grocery list"];
      } else if (lowerValue.includes('leftover')) {
        responseText = sampleResponses["leftover"];
      } else if (lowerValue.includes('substitute') || lowerValue.includes('replacement')) {
        responseText = sampleResponses["substitute"];
      } else if (lowerValue.includes('preference') || lowerValue.includes('diet')) {
        setShowPreferences(true);
        responseText = "I've opened the preferences panel where you can select your dietary preferences, favorite cuisines, and allergies. This helps me recommend recipes tailored to your needs.";
      }
      
      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((current) => [...current, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={cn('flex flex-col h-full max-w-5xl mx-auto px-4', className)}>
      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-4">
            <div className="flex flex-col space-y-5 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn('flex items-start gap-3', 
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <AvatarIcon type="assistant" className="mt-0.5" />
                  )}
                  <div
                    className={cn(
                      message.role === 'user'
                        ? 'message-bubble-user'
                        : 'message-bubble-assistant'
                    )}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <AvatarIcon type="user" className="mt-0.5" />
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-start gap-3">
                  <AvatarIcon type="assistant" className="mt-0.5" />
                  <div className="message-bubble-assistant">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-accent rounded-full animate-pulse" />
                      <div className="h-2 w-2 bg-accent rounded-full animate-pulse delay-75" />
                      <div className="h-2 w-2 bg-accent rounded-full animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          
          <div className="pt-4 pb-6">
            <PromptForm onSubmit={handleSubmit} />
          </div>
        </div>
        
        {(showRecipes || showPreferences) && (
          <div className="hidden md:block w-80 border-l border-border pl-6 py-6 overflow-auto">
            <div className="space-y-6">
              {showPreferences && <PreferencesSection />}
              {showRecipes && <RecipeList />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
