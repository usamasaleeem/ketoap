"use client";

import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";
import { AlertTriangle, Stethoscope } from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const commonAllergies = ["Peanuts", "Tree Nuts", "Milk", "Eggs", "Wheat/Gluten", "Soy", "Fish", "Shellfish", "Sesame"];
const commonConditions = ["Diabetes Type 1", "Diabetes Type 2", "High Blood Pressure", "High Cholesterol", "IBS", "Celiac Disease", "PCOS"];

export function RestrictionsStep({ data, onChange }: StepProps) {
  const toggleItem = (list: string[], item: string, field: "allergies" | "medicalConditions") => {
    const newList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    onChange({ [field]: newList });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-amber-500" />
          <Label>Allergies</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {commonAllergies.map((allergy) => {
            const isSelected = data.allergies.includes(allergy);
            return (
              <button
                key={allergy}
                type="button"
                onClick={() => toggleItem(data.allergies, allergy, "allergies")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "border-amber-500 bg-amber-500/10 text-amber-700"
                    : "border-border hover:border-amber-500/40 hover:bg-amber-50"
                }`}
              >
                {allergy}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">Tap to select any food allergies you have.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Stethoscope className="size-4 text-blue-500" />
          <Label>Medical Conditions</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {commonConditions.map((condition) => {
            const isSelected = data.medicalConditions.includes(condition);
            return (
              <button
                key={condition}
                type="button"
                onClick={() => toggleItem(data.medicalConditions, condition, "medicalConditions")}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-500 bg-blue-500/10 text-blue-700"
                    : "border-border hover:border-blue-500/40 hover:bg-blue-50"
                }`}
              >
                {condition}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">Tap to select any health conditions.</p>
      </div>
    </div>
  );
}
