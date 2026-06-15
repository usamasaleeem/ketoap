"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Leaf, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { OnboardingData } from "@/types";
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep";
import { GoalStep } from "@/components/onboarding/GoalStep";
import { ActivityStep } from "@/components/onboarding/ActivityStep";
import { DietStep } from "@/components/onboarding/DietStep";
import { RestrictionsStep } from "@/components/onboarding/RestrictionsStep";
import { FoodPreferencesStep } from "@/components/onboarding/FoodPreferencesStep";
import { MealSettingsStep } from "@/components/onboarding/MealSettingsStep";

const STEPS = [
  { title: "Personal Info", description: "Tell us about yourself" },
  { title: "Your Goal", description: "What do you want to achieve?" },
  { title: "Activity Level", description: "How active are you?" },
  { title: "Diet Preference", description: "Choose your diet style" },
  { title: "Restrictions", description: "Any allergies or conditions?" },
  { title: "Food Preferences", description: "What do you love to eat?" },
];

const defaultData: OnboardingData = {
  name: "",
  age: 25,
  gender: "male",
  height: 170,
  weight: 70,
  targetWeight: 65,
  goal: "weight-loss",
  activityLevel: "moderately-active",
  dietPreference: "omnivore",
  allergies: [],
  medicalConditions: [],
  favoriteFoods: [],
  foodsToAvoid: [],
  mealsPerDay: 3,
  planLength: 7,
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();
      if (response.ok) {
        // Store sessionId and redirect to payment
        sessionStorage.setItem("sessionId", result.sessionId);
        sessionStorage.setItem("onboardingData", JSON.stringify(data));
        router.push("/payment");
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch {
      alert("Failed to save data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = step === STEPS.length - 1;
  const canProceed = step === 0 ? data.name.trim().length > 0 : true;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="size-5 text-primary" />
              <span className="font-bold tracking-tight">NutriPlan</span>
            </Link>
            <Badge variant="outline" className="text-xs">
              Step {step + 1} of {STEPS.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Form Content */}
      <div className="pt-28 pb-32 px-6">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {STEPS[step].title}
                </h1>
                <p className="text-muted-foreground">
                  {STEPS[step].description}
                </p>
              </div>

              {step === 0 && <PersonalInfoStep data={data} onChange={updateData} />}
              {step === 1 && <GoalStep data={data} onChange={updateData} />}
              {step === 2 && <ActivityStep data={data} onChange={updateData} />}
              {step === 3 && <DietStep data={data} onChange={updateData} />}
              {step === 4 && <RestrictionsStep data={data} onChange={updateData} />}
              {step === 5 && <FoodPreferencesStep data={data} onChange={updateData} />}
              {step === 6 && <MealSettingsStep data={data} onChange={updateData} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={step === 0}
            className="rounded-full"
          >
            <ArrowLeft className="size-4 mr-1" />
            Back
          </Button>

          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed}
              className="rounded-full shadow-lg shadow-primary/25 px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="rounded-full shadow-lg shadow-primary/25 px-8"
            >
              Next
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
