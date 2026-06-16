"use client";

import type { OnboardingData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Beef,
  Carrot,
  Leaf,
  Moon,
  Flame,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Utensils,
  Heart
} from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const dietOptions = [
  {
    value: "omnivore",
    label: "Omnivore",
    description: "Eat everything — meat, fish, dairy, and plants",
    detailedDesc: "No dietary restrictions. Enjoy a balanced diet with all food groups.",
    icon: <Beef className="size-6" />,
    color: "from-amber-500 to-orange-500",
    bgColor: "orange-500",
    emoji: "🍖",
    features: ["Meat", "Fish", "Dairy", "Plants"]
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
    description: "No meat, but includes dairy and eggs",
    detailedDesc: "Plant-based with dairy and eggs. No meat, poultry, or fish.",
    icon: <Carrot className="size-6" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "green-500",
    emoji: "🥗",
    features: ["Plants", "Dairy", "Eggs", "No Meat"]
  },
  {
    value: "vegan",
    label: "Vegan",
    description: "100% plant-based, no animal products",
    detailedDesc: "Fully plant-based diet. No meat, dairy, eggs, or animal products.",
    icon: <Leaf className="size-6" />,
    color: "from-green-600 to-lime-500",
    bgColor: "green-600",
    emoji: "🌱",
    features: ["Plants", "Plant-based", "No Dairy", "No Eggs"]
  },
  {
    value: "halal",
    label: "Halal",
    description: "Following Islamic dietary guidelines",
    detailedDesc: "Permissible foods according to Islamic law. No pork or alcohol.",
    icon: <Moon className="size-6" />,
    color: "from-indigo-500 to-purple-500",
    bgColor: "indigo-500",
    emoji: "☪️",
    features: ["Halal Meat", "No Pork", "No Alcohol", "Permissible"]
  },
  {
    value: "keto",
    label: "Keto",
    description: "High fat, very low carb diet",
    detailedDesc: "High fat, moderate protein, very low carb. Designed for ketosis.",
    icon: <Flame className="size-6" />,
    color: "from-red-500 to-rose-500",
    bgColor: "red-500",
    emoji: "🔥",
    features: ["High Fat", "Low Carb", "Moderate Protein", "Ketosis"]
  },
] as const;

export function DietStep({ data, onChange }: StepProps) {
  const selectedDiet = dietOptions.find(d => d.value === data.dietPreference);
  const isSelected = (value: string) => data.dietPreference === value;

  return (
    <div className="space-y-8">
      {/* Header with decorative element */}


      {/* Diet Cards Grid */}
      <div className="grid gap-3">
        {dietOptions.map((diet, index) => {
          const selected = isSelected(diet.value);

          return (
            <motion.button
              key={diet.value}
              type="button"
              onClick={() => onChange({ dietPreference: diet.value })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative w-full group transition-all duration-300 ${selected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
            >
              <div
                className={`relative w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 ${selected
                  ? `border-${diet.bgColor}/50 bg-gradient-to-br from-${diet.bgColor}/10 to-transparent shadow-lg shadow-${diet.bgColor}/10`
                  : 'border-border hover:border-primary/30 bg-background/50 hover:bg-muted/20'
                  }`}
              >
                {/* Selection indicator */}
                {selected && (
                  <div className="absolute -top-2 -right-2">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                      <div className="relative bg-primary rounded-full p-1">
                        <CheckCircle2 className="size-4 text-white" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Icon with gradient background */}
                <div
                  className={`relative flex items-center justify-center size-14 rounded-2xl transition-all duration-300 flex-shrink-0 ${selected
                    ? `bg-gradient-to-br ${diet.color} shadow-lg`
                    : 'bg-muted/50 group-hover:bg-muted'
                    }`}
                >
                  <div className={`transition-all duration-300 ${selected
                    ? 'text-white scale-110'
                    : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                    {diet.icon}
                  </div>

                  {/* Glow effect when selected */}
                  {selected && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${diet.color} blur-xl opacity-50 -z-10`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold">
                      {diet.label}
                    </span>
                    <span className="text-sm">{diet.emoji}</span>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                      >
                        Selected
                      </motion.span>
                    )}
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${selected ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                    {selected ? diet.detailedDesc : diet.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {diet.features.map((feature, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${selected
                          ? `bg-${diet.bgColor}/10 text-${diet.bgColor}`
                          : 'bg-muted/50 text-muted-foreground'
                          }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className={`flex-shrink-0 self-center transition-all duration-300 ${selected
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                  }`}>
                  <ArrowRight className={`size-5 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected diet summary */}
      <AnimatePresence>
        {selectedDiet && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border border-primary/10"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedDiet.color}`}>
                <div className="text-white">
                  {selectedDiet.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">
                    Diet: <span className="text-primary">{selectedDiet.label}</span>
                  </p>
                  <span className="text-sm">{selectedDiet.emoji}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedDiet.detailedDesc}
                </p>
              </div>
              <div className="flex gap-1">
                {selectedDiet.features.slice(0, 2).map((feature, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}