"use client";

import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";
import { Heart, Ban } from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const commonFavorites = ["Chicken", "Salmon", "Beef", "Eggs", "Avocado", "Broccoli", "Sweet Potato", "Rice", "Berries", "Nuts"];
const commonAvoids = ["Pork", "Mushrooms", "Tomatoes", "Onions", "Garlic", "Spicy Food", "Liver", "Tofu", "Cilantro"];

export function FoodPreferencesStep({ data, onChange }: StepProps) {
  const toggleItem = (list: string[], item: string, field: "favoriteFoods" | "foodsToAvoid") => {
    const newList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    onChange({ [field]: newList });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="size-4 text-pink-500" />
          <Label>Favorite Foods</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {commonFavorites.map((food) => {
            const isSelected = data.favoriteFoods.includes(food);
            return (
              <button
                key={food}
                type="button"
                onClick={() => toggleItem(data.favoriteFoods, food, "favoriteFoods")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "border-pink-500 bg-pink-500/10 text-pink-700"
                    : "border-border hover:border-pink-500/40 hover:bg-pink-50"
                }`}
              >
                {food}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">Tap to select your favorite foods. We'll try to include them.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Ban className="size-4 text-red-500" />
          <Label>Foods to Avoid</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {commonAvoids.map((food) => {
            const isSelected = data.foodsToAvoid.includes(food);
            return (
              <button
                key={food}
                type="button"
                onClick={() => toggleItem(data.foodsToAvoid, food, "foodsToAvoid")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "border-red-500 bg-red-500/10 text-red-700"
                    : "border-border hover:border-red-500/40 hover:bg-red-50"
                }`}
              >
                {food}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">Tap to select foods you dislike or want to avoid.</p>
      </div>
    </div>
  );
}
