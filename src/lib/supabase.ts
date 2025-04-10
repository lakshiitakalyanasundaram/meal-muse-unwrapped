import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type User = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
};

export type UserPreferences = {
  id: string;
  user_id: string;
  dietary_restrictions: string[];
  allergies: string[];
  favorite_cuisines: string[];
  cooking_skill_level: 'beginner' | 'intermediate' | 'advanced';
  meal_prep_frequency: 'daily' | 'weekly' | 'monthly';
  created_at: string;
  updated_at: string;
}; 