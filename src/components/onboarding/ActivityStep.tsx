"use client";

import type { OnboardingData } from "@/types";
import { Sofa, Footprints, Bike, Flame } from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const activityLevels = [
  {
    value: "sedentary",
    label: "Sedentary",
    description: "Little or no exercise, desk job",
    icon: <Sofa className="size-5" />,
  },
  {
    value: "lightly-active",
    label: "Lightly Active",
    description: "Light exercise 1-3 days/week",
    icon: <Footprints className="size-5" />,
  },
  {
    value: "moderately-active",
    label: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
    icon: <Bike className="size-5" />,
  },
  {
    value: "very-active",
    label: "Very Active",
    description: "Heavy exercise 6-7 days/week",
    icon: <Flame className="size-5" />,
  },
] as const;

export function ActivityStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-3">
      {activityLevels.map((level) => (
        <button
          key={level.value}
          type="button"
          onClick={() => onChange({ activityLevel: level.value })}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
            data.activityLevel === level.value
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-primary/40 hover:bg-muted/50"
          }`}
        >
          <div
            className={`flex items-center justify-center size-11 rounded-xl transition-colors ${
              data.activityLevel === level.value
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {level.icon}
          </div>
          <div>
            <p className="font-medium">{level.label}</p>
            <p className="text-sm text-muted-foreground">{level.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
