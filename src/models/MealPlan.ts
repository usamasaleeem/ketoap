import mongoose, { Schema, type Document } from "mongoose";

export interface IMealPlan extends Document {
  sessionId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
  userData: Record<string, unknown>;
  plan: {
    summary: {
      dailyCalories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
      water: string;
    };
    mealPlan: Array<{
      day: number;
      meals: Array<{
        name: string;
        type: string;
        ingredients: string[];
        instructions: string[];
        nutrition: {
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
        };
        prepTime: string;
      }>;
      totalNutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
      };
    }>;
    shoppingList: Array<{
      item: string;
      quantity: string;
      category: string;
    }>;
    tips: string[];
  };
  createdAt: Date;
}

const MealPlanSchema = new Schema<IMealPlan>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: "OnboardingSession", required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
    userData: { type: Schema.Types.Mixed, required: true },
    plan: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const MealPlan =
  mongoose.models.MealPlan ||
  mongoose.model<IMealPlan>("MealPlan", MealPlanSchema);
