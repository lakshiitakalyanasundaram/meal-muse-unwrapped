import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/App';
import { supabase } from '@/lib/supabase';
import { UserPreferences } from '@/lib/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });
  const [preferences, setPreferences] = React.useState<Partial<UserPreferences>>({
    dietary_restrictions: [],
    allergies: [],
    favorite_cuisines: [],
    cooking_skill_level: 'beginner',
    meal_prep_frequency: 'weekly',
  });

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Paleo',
  ];

  const allergyOptions = [
    'Peanuts',
    'Tree Nuts',
    'Milk',
    'Eggs',
    'Fish',
    'Shellfish',
    'Soy',
    'Wheat',
  ];

  const cuisineOptions = [
    'Italian',
    'Mexican',
    'Chinese',
    'Indian',
    'Japanese',
    'Mediterranean',
    'American',
    'Thai',
    'French',
    'Middle Eastern',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (type: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [type]: value }));
  };

  const handleCheckboxChange = (type: 'dietary_restrictions' | 'allergies' | 'favorite_cuisines', value: string) => {
    setPreferences(prev => {
      const currentValues = prev[type] as string[] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [type]: newValues };
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting login with:', { email: formData.email });
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      console.log('Login successful:', data);
      if (data.user) {
        login();
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting signup with:', { email: formData.email, fullName: formData.fullName });
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (authError) {
        console.error('Signup error:', authError);
        throw authError;
      }

      console.log('Signup successful:', authData);
      if (authData.user) {
        try {
          // Create user preferences
          const { error: preferencesError } = await supabase
            .from('user_preferences')
            .insert([{
              user_id: authData.user.id,
              ...preferences,
            }]);

          if (preferencesError) {
            console.error('Preferences creation error:', preferencesError);
            // Don't throw the error, just log it and continue
            toast({
              title: "Preferences not saved",
              description: "Your account was created, but we couldn't save your preferences. You can set them up later.",
            });
          }
        } catch (preferencesError) {
          console.error('Preferences creation failed:', preferencesError);
          // Don't throw the error, just log it and continue
          toast({
            title: "Preferences not saved",
            description: "Your account was created, but we couldn't save your preferences. You can set them up later.",
          });
        }

        login();
        toast({
          title: "Account created",
          description: "Welcome to MealMuse!",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Signup failed:', error);
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to MealMuse</h1>
          <p className="text-muted-foreground">Your AI Meal Planning Assistant</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              {/* Preferences Section */}
              <div className="space-y-6 pt-4 border-t">
                <h3 className="text-lg font-semibold">Your Preferences</h3>
                
                {/* Dietary Restrictions */}
                <div className="space-y-2">
                  <Label>Dietary Restrictions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {dietaryOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dietary-${option}`}
                          checked={(preferences.dietary_restrictions || []).includes(option)}
                          onCheckedChange={() => handleCheckboxChange('dietary_restrictions', option)}
                        />
                        <Label htmlFor={`dietary-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div className="space-y-2">
                  <Label>Allergies</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {allergyOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`allergy-${option}`}
                          checked={(preferences.allergies || []).includes(option)}
                          onCheckedChange={() => handleCheckboxChange('allergies', option)}
                        />
                        <Label htmlFor={`allergy-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Favorite Cuisines */}
                <div className="space-y-2">
                  <Label>Favorite Cuisines</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {cuisineOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cuisine-${option}`}
                          checked={(preferences.favorite_cuisines || []).includes(option)}
                          onCheckedChange={() => handleCheckboxChange('favorite_cuisines', option)}
                        />
                        <Label htmlFor={`cuisine-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cooking Skill Level */}
                <div className="space-y-2">
                  <Label htmlFor="cooking-skill">Cooking Skill Level</Label>
                  <Select
                    value={preferences.cooking_skill_level}
                    onValueChange={(value) => handlePreferenceChange('cooking_skill_level', value)}
                  >
                    <SelectTrigger id="cooking-skill">
                      <SelectValue placeholder="Select your skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meal Prep Frequency */}
                <div className="space-y-2">
                  <Label htmlFor="meal-prep">Meal Prep Frequency</Label>
                  <Select
                    value={preferences.meal_prep_frequency}
                    onValueChange={(value) => handlePreferenceChange('meal_prep_frequency', value)}
                  >
                    <SelectTrigger id="meal-prep">
                      <SelectValue placeholder="Select your prep frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth; 