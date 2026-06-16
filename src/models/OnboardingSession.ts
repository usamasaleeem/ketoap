import mongoose, { Schema, type Document } from "mongoose";

export interface IOnboardingSession extends Document {
  data: {
    name: string;
    email: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
    targetWeight: number;
    goal: string;
    activityLevel: string;
    dietPreference: string;
    allergies: string[];
    medicalConditions: string[];
    favoriteFoods: string[];
    foodsToAvoid: string[];
    mealsPerDay: number;
    planLength: number;
  };
  createdAt: Date;
}

const OnboardingSessionSchema = new Schema<IOnboardingSession>(
  {
    data: {
      name: { type: String },
      email: { type: String, required: true, default: "unknown@example.com" },
      age: { type: Number, required: true },
      gender: { type: String, required: true },
      height: { type: Number, required: true },
      weight: { type: Number, required: true },
      targetWeight: { type: Number, required: true },
      goal: { type: String, required: true },
      activityLevel: { type: String, required: true },
      dietPreference: { type: String, required: true },
      allergies: { type: [String], default: [] },
      medicalConditions: { type: [String], default: [] },
      favoriteFoods: { type: [String], default: [] },
      foodsToAvoid: { type: [String], default: [] },
      mealsPerDay: { type: Number, required: true, default: 3 },
      planLength: { type: Number, required: true, default: 7 },
    },
  },
  { timestamps: true }
);

export const OnboardingSession =
  mongoose.models.OnboardingSession ||
  mongoose.model<IOnboardingSession>("OnboardingSession", OnboardingSessionSchema);
