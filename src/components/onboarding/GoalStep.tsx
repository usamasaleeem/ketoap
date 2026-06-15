"use client";

import type { OnboardingData } from "@/types";
import { Target, TrendingUp, Dumbbell, Flame, Scale } from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const goals = [
  { value: "weight-loss", label: "Weight Loss", description: "Lose weight safely and sustainably", icon: <Target className="size-5" /> },
  { value: "weight-gain", label: "Weight Gain", description: "Gain healthy weight with proper nutrition", icon: <TrendingUp className="size-5" /> },
  { value: "muscle-gain", label: "Muscle Gain", description: "Build lean muscle with high protein meals", icon: <Dumbbell className="size-5" /> },
  { value: "fat-loss", label: "Fat Loss", description: "Reduce body fat while maintaining muscle", icon: <Flame className="size-5" /> },
  { value: "maintenance", label: "Maintenance", description: "Maintain your current weight and health", icon: <Scale className="size-5" /> },
] as const;

export function GoalStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <button
          key={goal.value}
          type="button"
          onClick={() => onChange({ goal: goal.value })}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
            data.goal === goal.value
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-primary/40 hover:bg-muted/50"
          }`}
        >
          <div
            className={`flex items-center justify-center size-11 rounded-xl transition-colors ${
              data.goal === goal.value
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {goal.icon}
          </div>
          <div>
            <p className="font-medium">{goal.label}</p>
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
