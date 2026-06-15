"use client";

import type { OnboardingData } from "@/types";
import { Beef, Carrot, Leaf, Moon, Flame } from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const dietOptions = [
  {
    value: "omnivore",
    label: "Omnivore",
    description: "Eat everything — meat, fish, dairy, and plants",
    icon: <Beef className="size-5" />,
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
    description: "No meat, but includes dairy and eggs",
    icon: <Carrot className="size-5" />,
  },
  {
    value: "vegan",
    label: "Vegan",
    description: "100% plant-based, no animal products",
    icon: <Leaf className="size-5" />,
  },
  {
    value: "halal",
    label: "Halal",
    description: "Following Islamic dietary guidelines",
    icon: <Moon className="size-5" />,
  },
  {
    value: "keto",
    label: "Keto",
    description: "High fat, very low carb diet",
    icon: <Flame className="size-5" />,
  },
] as const;

export function DietStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-3">
      {dietOptions.map((diet) => (
        <button
          key={diet.value}
          type="button"
          onClick={() => onChange({ dietPreference: diet.value })}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
            data.dietPreference === diet.value
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-primary/40 hover:bg-muted/50"
          }`}
        >
          <div
            className={`flex items-center justify-center size-11 rounded-xl transition-colors ${
              data.dietPreference === diet.value
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {diet.icon}
          </div>
          <div>
            <p className="font-medium">{diet.label}</p>
            <p className="text-sm text-muted-foreground">{diet.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
