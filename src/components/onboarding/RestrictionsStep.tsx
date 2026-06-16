"use client";

import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const commonAllergies = [
  "Peanuts",
  "Tree Nuts",
  "Milk",
  "Eggs",
  "Wheat/Gluten",
  "Soy",
  "Fish",
  "Shellfish",
  "Sesame"
];

const commonConditions = [
  "Diabetes Type 1",
  "Diabetes Type 2",
  "High Blood Pressure",
  "High Cholesterol",
  "IBS",
  "Celiac Disease",
  "PCOS"
];

export function RestrictionsStep({ data, onChange }: StepProps) {
  const toggleItem = (list: string[], item: string, field: "allergies" | "medicalConditions") => {
    const newList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    onChange({ [field]: newList });
  };

  const hasAllergies = data.allergies.length > 0;
  const hasConditions = data.medicalConditions.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/10">
            <AlertTriangle className="size-5 text-amber-500" />
          </div>
          <span className="text-sm font-medium text-amber-500">Allergies</span>
          {hasAllergies && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-medium bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full"
            >
              {data.allergies.length} selected
            </motion.span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Select any foods you're allergic to or want to avoid
        </p>
      </div>

      {/* Allergies Grid */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {commonAllergies.map((allergy, index) => {
            const isSelected = data.allergies.includes(allergy);

            return (
              <motion.button
                key={allergy}
                type="button"
                onClick={() => toggleItem(data.allergies, allergy, "allergies")}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${isSelected
                  ? "border-amber-500 bg-amber-500/10 text-amber-700 shadow-sm shadow-amber-500/10"
                  : "border-border hover:border-amber-500/40 hover:bg-amber-50/50"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  {isSelected && (
                    <CheckCircle2 className="size-3.5 text-amber-500" />
                  )}
                  {allergy}
                  {isSelected && (
                    <X className="size-3.5 text-amber-500/50 group-hover:text-amber-500" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected allergies summary */}
        <AnimatePresence>
          {hasAllergies && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-amber-700">Selected allergies:</span>{" "}
                  {data.allergies.join(", ")}
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
          <span className="bg-background px-4 text-xs text-muted-foreground">or</span>
        </div>
      </div>

      {/* Medical Conditions Section */}
      <div className="space-y-4">
        {/* Header */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-500/10">
              <Stethoscope className="size-5 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-blue-500">Medical Conditions</span>
            {hasConditions && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs font-medium bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full"
              >
                {data.medicalConditions.length} selected
              </motion.span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Select any health conditions that may affect your meal planning
          </p>
        </div>

        {/* Conditions Grid */}
        <div className="flex flex-wrap gap-2">
          {commonConditions.map((condition, index) => {
            const isSelected = data.medicalConditions.includes(condition);

            return (
              <motion.button
                key={condition}
                type="button"
                onClick={() => toggleItem(data.medicalConditions, condition, "medicalConditions")}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                className={`relative px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${isSelected
                  ? "border-blue-500 bg-blue-500/10 text-blue-700 shadow-sm shadow-blue-500/10"
                  : "border-border hover:border-blue-500/40 hover:bg-blue-50/50"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  {isSelected && (
                    <CheckCircle2 className="size-3.5 text-blue-500" />
                  )}
                  {condition}
                  {isSelected && (
                    <X className="size-3.5 text-blue-500/50 group-hover:text-blue-500" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected conditions summary */}
        <AnimatePresence>
          {hasConditions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-blue-700">Selected conditions:</span>{" "}
                  {data.medicalConditions.join(", ")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
}