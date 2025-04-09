
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export type Preference = {
  id: string;
  label: string;
  type: 'diet' | 'cuisine' | 'ingredient' | 'allergy';
};

interface PreferenceSelectorProps {
  title: string;
  preferences: Preference[];
  selectedPreferences: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function PreferenceSelector({
  title,
  preferences,
  selectedPreferences,
  onChange,
  className,
}: PreferenceSelectorProps) {
  const togglePreference = (id: string) => {
    if (selectedPreferences.includes(id)) {
      onChange(selectedPreferences.filter((p) => p !== id));
    } else {
      onChange([...selectedPreferences, id]);
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {preferences.map((preference) => (
          <button
            key={preference.id}
            onClick={() => togglePreference(preference.id)}
            className={cn(
              'rounded-full px-3 py-1 text-sm font-medium transition-colors',
              selectedPreferences.includes(preference.id)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
            type="button"
          >
            {preference.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PreferencesSection({ className }: { className?: string }) {
  const dietaryPreferences: Preference[] = [
    { id: 'vegetarian', label: 'Vegetarian', type: 'diet' },
    { id: 'vegan', label: 'Vegan', type: 'diet' },
    { id: 'gluten-free', label: 'Gluten-Free', type: 'diet' },
    { id: 'keto', label: 'Keto', type: 'diet' },
    { id: 'paleo', label: 'Paleo', type: 'diet' },
    { id: 'low-carb', label: 'Low Carb', type: 'diet' },
  ];

  const cuisinePreferences: Preference[] = [
    { id: 'italian', label: 'Italian', type: 'cuisine' },
    { id: 'mexican', label: 'Mexican', type: 'cuisine' },
    { id: 'asian', label: 'Asian', type: 'cuisine' },
    { id: 'mediterranean', label: 'Mediterranean', type: 'cuisine' },
    { id: 'american', label: 'American', type: 'cuisine' },
    { id: 'indian', label: 'Indian', type: 'cuisine' },
  ];

  const allergyPreferences: Preference[] = [
    { id: 'dairy-free', label: 'Dairy-Free', type: 'allergy' },
    { id: 'nut-free', label: 'Nut-Free', type: 'allergy' },
    { id: 'soy-free', label: 'Soy-Free', type: 'allergy' },
    { id: 'egg-free', label: 'Egg-Free', type: 'allergy' },
    { id: 'shellfish-free', label: 'Shellfish-Free', type: 'allergy' },
  ];

  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  return (
    <div className={cn('space-y-6', className)}>
      <h2 className="text-lg font-semibold">Your Preferences</h2>
      <PreferenceSelector
        title="Dietary Preferences"
        preferences={dietaryPreferences}
        selectedPreferences={selectedDietary}
        onChange={setSelectedDietary}
      />
      <PreferenceSelector
        title="Cuisine Preferences"
        preferences={cuisinePreferences}
        selectedPreferences={selectedCuisines}
        onChange={setSelectedCuisines}
      />
      <PreferenceSelector
        title="Allergies & Restrictions"
        preferences={allergyPreferences}
        selectedPreferences={selectedAllergies}
        onChange={setSelectedAllergies}
      />
    </div>
  );
}
