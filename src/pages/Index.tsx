import React from 'react';
import { Button } from "@/components/ui/button";
import { ChatWindow } from '@/components/ui/chat-window';
import { RecipeList } from '@/components/ui/recipe-card';
import { PreferencesSection } from '@/components/ui/preference-selector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/App';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { toast } = useToast();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showMobilePanel, setShowMobilePanel] = React.useState<'chat' | 'recipes' | 'preferences'>('chat');
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "Your session has been ended."
    });
    navigate('/auth');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
              <path d="M12 8c2.648 0 4.644-.96 2.964-2.612C13.275 3.726 12 3.25 12 3.25s-1.276.476-2.964 2.138C7.356 7.04 9.352 8 12 8Z" />
              <path d="M18 11.5s-4-1-6-1-6 1-6 1 .332 3.838 1.376 6.674A2 2 0 0 0 9.108 19h5.784a2 2 0 0 0 1.732-.826C17.668 15.338 18 11.5 18 11.5Z" />
              <path d="M12 20v2" />
            </svg>
            <h1 className="text-lg font-semibold">MealMuse</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => {
              toast({
                title: "Daily Tip",
                description: "Plan your weekly meals on Sunday and prep ingredients in advance to save time during the week."
              });
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <span className="sr-only">Tips</span>
            </Button>
            
            <Button variant="default" size="sm" onClick={handleLogout} className="flex items-center gap-1 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="w-4 h-4">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Tabs - Only visible on mobile */}
      <div className="md:hidden border-b border-border">
        <div className="container">
          <Tabs defaultValue="chat" className="w-full" onValueChange={value => setShowMobilePanel(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="chat">
              <ChatWindow />
            </TabsContent>
            <TabsContent value="recipes">
              <div className="p-4">
                <RecipeList />
              </div>
            </TabsContent>
            <TabsContent value="preferences">
              <div className="p-4">
                <PreferencesSection />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Content - Desktop Layout */}
      <div className="flex-1 hidden md:flex overflow-hidden">
        <div className="flex-1 min-w-0">
          <ChatWindow />
        </div>
        <div className="w-80 md:w-96 border-l border-border overflow-y-auto">
          <div className="p-6 space-y-8">
            <PreferencesSection />
            <RecipeList />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-border py-3 mt-auto">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© 2025 MealMuse - Your AI Meal Planning Assistant</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-foreground transition-colors" onClick={() => {
              toast({
                title: "About MealMuse",
                description: "MealMuse is your AI-powered meal planning assistant that helps you create delicious meals based on your preferences.",
                duration: 5000
              });
            }}>
              About
            </button>
            <button className="hover:text-foreground transition-colors" onClick={() => {
              toast({
                title: "Privacy Policy",
                description: "MealMuse prioritizes your privacy. We store your preferences locally and don't share your data with third parties.",
                duration: 5000
              });
            }}>
              Privacy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
