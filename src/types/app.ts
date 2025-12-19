export type Goal = 'bumbum' | 'cintura' | 'ambos';

export type ActivityLevel = 'sedentaria' | 'moderada' | 'ativa';

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  waist: number;
  hip: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  startDate: string;
}

export interface DailyProgress {
  date: string;
  weight?: number;
  waist?: number;
  hip?: number;
  recipeCompleted: boolean;
  exerciseCompleted: boolean;
  waterCompleted: boolean;
  sugarAvoided: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  category: 'bumbum' | 'cintura';
  ingredients: string[];
  preparation: string;
  bestTime: string;
  benefits: string[];
  image?: string;
}

export interface Exercise {
  id: string;
  title: string;
  category: 'bumbum' | 'cintura';
  description: string;
  duration: string;
  repetitions: string;
  image?: string;
}

export interface WeeklyPlan {
  day: string;
  exercises: Exercise[];
  recipe: Recipe;
}
