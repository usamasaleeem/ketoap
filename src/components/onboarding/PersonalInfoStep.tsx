"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
    <div className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Age</Label>
            <span className="text-xl font-bold text-primary">{data.age} years</span>
          </div>
          <Slider
            min={10}
            max={100}
            step={1}
            value={[data.age]}
            onValueChange={([val]) => onChange({ age: val })}
            className="py-4"
          />
        </div>

        <div className="space-y-4">
          <Label>Gender</Label>
          <div className="flex gap-2">
            {genderOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ gender: opt.value })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${data.gender === opt.value
                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                    : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
              >
                <span className="text-lg">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Height</Label>
            <span className="text-xl font-bold text-primary">{data.height} cm</span>
          </div>
          <Slider
            min={100}
            max={250}
            step={1}
            value={[data.height]}
            onValueChange={([val]) => onChange({ height: val })}
            className="py-4"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Current Weight</Label>
            <span className="text-xl font-bold text-primary">{data.weight} kg</span>
          </div>
          <Slider
            min={30}
            max={200}
            step={1}
            value={[data.weight]}
            onValueChange={([val]) => onChange({ weight: val })}
            className="py-4"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Target Weight</Label>
            <span className="text-xl font-bold text-primary">{data.targetWeight} kg</span>
          </div>
          <Slider
            min={30}
            max={200}
            step={1}
            value={[data.targetWeight]}
            onValueChange={([val]) => onChange({ targetWeight: val })}
            className="py-4"
          />
        </div>
      </div>
    </div>
  );
}
