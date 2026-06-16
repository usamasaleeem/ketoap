export interface OnboardingData {
  // Personal Information
  name: string;
  email: string;
  age: number;
  gender: "male" | "female" | "other";
  height: number; // cm
  weight: number; // kg
  targetWeight: number; // kg

  // Goal
  goal: "weight-loss" | "weight-gain" | "muscle-gain" | "fat-loss" | "maintenance";

  // Activity Level
  activityLevel: "sedentary" | "lightly-active" | "moderately-active" | "very-active";

  // Diet Preference
  dietPreference: "omnivore" | "vegetarian" | "vegan" | "halal" | "keto";

  // Restrictions
  allergies: string[];
  medicalConditions: string[];

  // Food Preferences
  favoriteFoods: string[];
  foodsToAvoid: string[];

  // Meal Plan Settings
  mealsPerDay: number;
  planLength: 7 | 14 | 30;
}

export interface MealNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  ingredients: string[];
  instructions: string[];
  nutrition: MealNutrition;
  prepTime: string;
}

export interface DayPlan {
  day: number;
  meals: Meal[];
  totalNutrition: MealNutrition;
}

export interface NutritionSummary {
  dailyCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water: string;
}

export interface ShoppingItem {
  item: string;
  quantity: string;
  category: string;
}

export interface MealPlanData {
  summary: NutritionSummary;
  mealPlan: DayPlan[];
  shoppingList: ShoppingItem[];
  tips: string[];
}

export interface OnboardingSession {
  _id: string;
  data: OnboardingData;
  createdAt: string;
}

export interface Payment {
  _id: string;
  sessionId: string;
  status: "pending" | "completed" | "failed";
  amount: number;
  polarCheckoutId: string;
  createdAt: string;
}

export interface MealPlan {
  _id: string;
  sessionId: string;
  paymentId: string;
  userData: OnboardingData;
  plan: MealPlanData;
  createdAt: string;
}
