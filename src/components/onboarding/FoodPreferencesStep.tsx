"use client";

import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Ban,
  Sparkles,
  CheckCircle2,
  X,
  Utensils
} from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const commonFavorites = [
  "Chicken",
  "Salmon",
  "Beef",
  "Eggs",
  "Avocado",
  "Broccoli",
  "Sweet Potato",
  "Rice",
  "Berries",
  "Nuts"
];

const commonAvoids = [
  "Pork",
  "Mushrooms",
  "Tomatoes",
  "Onions",
  "Garlic",
  "Spicy Food",
  "Liver",
  "Tofu",
  "Cilantro"
];

export function FoodPreferencesStep({ data, onChange }: StepProps) {
  const toggleItem = (list: string[], item: string, field: "favoriteFoods" | "foodsToAvoid") => {
    const newList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    onChange({ [field]: newList });
  };

  const hasFavorites = data.favoriteFoods.length > 0;
  const hasAvoids = data.foodsToAvoid.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}


      {/* Favorite Foods Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-pink-500/10">
            <Heart className="size-4 text-pink-500" />
          </div>
          <Label className="font-medium">Favorite Foods</Label>
          {hasFavorites && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-medium bg-pink-500/10 text-pink-500 px-2 py-0.5 rounded-full"
            >
              {data.favoriteFoods.length} selected
            </motion.span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {commonFavorites.map((food, index) => {
            const isSelected = data.favoriteFoods.includes(food);

            return (
              <motion.button
                key={food}
                type="button"
                onClick={() => toggleItem(data.favoriteFoods, food, "favoriteFoods")}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${isSelected
                  ? "border-pink-500 bg-pink-500/10 text-pink-700 shadow-sm shadow-pink-500/10"
                  : "border-border hover:border-pink-500/40 hover:bg-pink-50/50"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  {isSelected ? (
                    <CheckCircle2 className="size-3.5 text-pink-500" />
                  ) : (
                    <Heart className="size-3.5 text-muted-foreground/30" />
                  )}
                  {food}
                  {isSelected && (
                    <X className="size-3.5 text-pink-500/50 group-hover:text-pink-500" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected favorites summary */}
        <AnimatePresence>
          {hasFavorites && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-lg bg-pink-500/5 border border-pink-500/20">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-pink-700">Your favorites:</span>{" "}
                  {data.favoriteFoods.join(", ")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-xs text-muted-foreground">preferences</span>
        </div>
      </div>

      {/* Foods to Avoid Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-500/10">
            <Ban className="size-4 text-red-500" />
          </div>
          <Label className="font-medium">Foods to Avoid</Label>
          {hasAvoids && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-medium bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full"
            >
              {data.foodsToAvoid.length} selected
            </motion.span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {commonAvoids.map((food, index) => {
            const isSelected = data.foodsToAvoid.includes(food);

            return (
              <motion.button
                key={food}
                type="button"
                onClick={() => toggleItem(data.foodsToAvoid, food, "foodsToAvoid")}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                className={`relative px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${isSelected
                  ? "border-red-500 bg-red-500/10 text-red-700 shadow-sm shadow-red-500/10"
                  : "border-border hover:border-red-500/40 hover:bg-red-50/50"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  {isSelected ? (
                    <X className="size-3.5 text-red-500" />
                  ) : (
                    <Ban className="size-3.5 text-muted-foreground/30" />
                  )}
                  {food}
                  {isSelected && (
                    <X className="size-3.5 text-red-500/50 group-hover:text-red-500" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected avoids summary */}
        <AnimatePresence>
          {hasAvoids && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-red-700">Foods to avoid:</span>{" "}
                  {data.foodsToAvoid.join(", ")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
}