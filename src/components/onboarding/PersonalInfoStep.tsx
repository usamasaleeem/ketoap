"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const genderOptions = [
  { value: "male", label: "Male", emoji: "👨" },
  { value: "female", label: "Female", emoji: "👩" },
  { value: "other", label: "Other", emoji: "🧑" },
] as const;

export function PersonalInfoStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min={10}
            max={100}
            value={data.age}
            onChange={(e) => onChange({ age: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <div className="flex gap-2">
            {genderOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ gender: opt.value })}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                  data.gender === opt.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            min={100}
            max={250}
            value={data.height}
            onChange={(e) => onChange({ height: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            min={30}
            max={300}
            value={data.weight}
            onChange={(e) => onChange({ weight: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetWeight">Target (kg)</Label>
          <Input
            id="targetWeight"
            type="number"
            min={30}
            max={300}
            value={data.targetWeight}
            onChange={(e) => onChange({ targetWeight: Number(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
}
