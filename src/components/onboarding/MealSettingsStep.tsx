"use client";

import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";
import { Calendar, UtensilsCrossed } from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const planLengthOptions = [
  { value: 7, label: "7 Days", description: "Perfect to try it out" },
  { value: 14, label: "14 Days", description: "Build lasting habits" },
  { value: 30, label: "30 Days", description: "Full transformation" },
] as const;

const mealsOptions = [2, 3, 4, 5] as const;

export function MealSettingsStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          <Label>Plan Length</Label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {planLengthOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ planLength: opt.value })}
              className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                data.planLength === opt.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              }`}
            >
              <p className="font-bold text-xl">{opt.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="size-4 text-primary" />
          <Label>Meals Per Day</Label>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {mealsOptions.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange({ mealsPerDay: n })}
              className={`flex flex-col items-center py-4 rounded-xl border transition-all cursor-pointer ${
                data.mealsPerDay === n
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              }`}
            >
              <p className="font-bold text-2xl">{n}</p>
              <p className="text-xs text-muted-foreground mt-1">meals</p>
            </button>
          ))}
        </div>
      </div>

      {/* Summary preview */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-sm font-medium text-primary mb-2">Plan Summary</p>
        <p className="text-sm text-muted-foreground">
          You&apos;ll receive a <strong className="text-foreground">{data.planLength}-day</strong> meal plan with{" "}
          <strong className="text-foreground">{data.mealsPerDay} meals</strong> per day — that&apos;s{" "}
          <strong className="text-foreground">{data.planLength * data.mealsPerDay} total meals</strong> with
          complete recipes, nutrition info, and a shopping list.
        </p>
      </div>
    </div>
  );
}
