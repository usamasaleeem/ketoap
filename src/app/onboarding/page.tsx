"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  Loader2,
  Heart,
  Target,
  Activity,
  Flame,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Award,
  Zap,
  Crown,
  Star,
  CheckCircle2,
  Clock,
  Utensils,
  Dumbbell,
  Scale,
  Brain,
  Coffee,
  Sun,
  Moon,
  Shield,
  Gift,
  ChefHat
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { OnboardingData } from "@/types";

// Import all individual steps
import { AgeStep } from "@/components/onboarding/AgeStep";
import { GenderStep } from "@/components/onboarding/GenderStep";
import { HeightStep } from "@/components/onboarding/HeightStep";
import { WeightStep } from "@/components/onboarding/WeightStep";
import { TargetWeightStep } from "@/components/onboarding/TargetWeightStep";
import { GoalStep } from "@/components/onboarding/GoalStep";
import { ActivityStep } from "@/components/onboarding/ActivityStep";
import { DietStep } from "@/components/onboarding/DietStep";
import { RestrictionsStep } from "@/components/onboarding/RestrictionsStep";
import { FoodPreferencesStep } from "@/components/onboarding/FoodPreferencesStep";
import { EmailStep } from "@/components/onboarding/EmailStep";

const STEPS = [
  { title: "Your Age", description: "Tell us how old you are" },
  { title: "Your Gender", description: "Help us personalize your plan" },
  { title: "Your Height", description: "We need this for accurate calculations" },
  { title: "Current Weight", description: "Your starting point" },
  { title: "Target Weight", description: "Your goal" },
  { title: "Your Goal", description: "What do you want to achieve?" },
  { title: "Activity Level", description: "How active are you?" },
  { title: "Diet Preference", description: "Choose your diet style" },
  { title: "Restrictions", description: "Any allergies or conditions?" },
  { title: "Food Preferences", description: "What do you love to eat?" },
  { title: "Your Email", description: "Enter your email to get started" },
];

const defaultData: OnboardingData = {
  name: "",
  email: "",
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

// Loading animation steps
const loadingSteps = [
  { label: "Analyzing your profile...", icon: <Sparkles className="size-5" /> },
  { label: "Calculating nutrition targets...", icon: <ChefHat className="size-5" /> },
  { label: "Creating personalized recipes...", icon: <ChefHat className="size-5" /> },
  { label: "Building your shopping list...", icon: <CheckCircle2 className="size-5" /> },
];

// Generating Animation Component
function GeneratingAnimation({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        setTimeout(onComplete, 1000);
        return prev;
      });
    }, 3000);

    return () => clearInterval(stepInterval);
  }, [onComplete]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <motion.div
        className="mx-auto mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative size-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-8 text-primary animate-spin" style={{ animationDuration: "3s" }} />
          </div>
        </div>
      </motion.div>

      <motion.h1
        className="text-2xl font-bold mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Creating Your Meal Plan
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Our AI is crafting your personalized nutrition plan. This takes about 30-60 seconds.
      </motion.p>

      {/* Loading steps */}
      <div className="space-y-3 text-left max-w-xs w-full mx-auto">
        {loadingSteps.map((step, i) => (
          <motion.div
            key={step.label}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${i <= currentStep
              ? "bg-primary/5 text-foreground"
              : "text-muted-foreground/50"
              }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.2 }}
          >
            <div className={`transition-colors ${i <= currentStep ? "text-primary" : ""}`}>
              {i < currentStep ? (
                <CheckCircle2 className="size-5" />
              ) : i === currentStep ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <div className="size-5 rounded-full border-2 border-current" />
              )}
            </div>
            <span className="text-sm font-medium">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGeneratingComplete = () => {
    // After generation is complete, redirect to payment
    setIsGenerating(false);
    router.push("/payment");
  };

  const handleSubmit = async () => {
    // Validate email first
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();
      if (response.ok) {
        sessionStorage.setItem("sessionId", result.sessionId);
        sessionStorage.setItem("onboardingData", JSON.stringify(data));
        // After saving, show generating animation
        setIsSubmitting(false);
        setIsGenerating(true);
      } else {
        alert(result.error || "Something went wrong");
        setIsSubmitting(false);
      }
    } catch {
      alert("Failed to save data. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Validation logic for each step
  const getCanProceed = () => {
    switch (step) {
      case 0: // Age
        return data.age >= 10 && data.age <= 100;
      case 1: // Gender
        return data.gender !== undefined && data.gender !== null;
      case 2: // Height
        return data.height >= 100 && data.height <= 250;
      case 3: // Weight
        return data.weight >= 30 && data.weight <= 200;
      case 4: // Target Weight
        return data.targetWeight >= 30 && data.targetWeight <= 200;
      case 9: // Food Preferences - always proceed
        return true;
      case 10: // Email - validate email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      default:
        return true;
    }
  };

  const isLastStep = step === STEPS.length - 1;
  const canProceed = getCanProceed();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="size-5 text-primary" />
              <span className="font-bold tracking-tight">Ketodine</span>
            </Link>
            {!isGenerating && (
              <Badge variant="outline" className="text-xs">
                Step {Math.min(step + 1, STEPS.length)} of {STEPS.length}
              </Badge>
            )}
          </div>
          {!isGenerating && <Progress value={progress} className="h-1.5" />}
        </div>
      </div>

      {/* Form Content */}
      <div className="pt-28 pb-32 px-6">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <GeneratingAnimation onComplete={handleGeneratingComplete} />
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {step < STEPS.length && (
                  <>
                    <div className="mb-8">
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                        {STEPS[step].title}
                      </h1>
                      <p className="text-muted-foreground">
                        {STEPS[step].description}
                      </p>
                    </div>

                    {/* Render the appropriate step */}
                    {step === 0 && <AgeStep data={data} onChange={updateData} />}
                    {step === 1 && <GenderStep data={data} onChange={updateData} />}
                    {step === 2 && <HeightStep data={data} onChange={updateData} />}
                    {step === 3 && <WeightStep data={data} onChange={updateData} />}
                    {step === 4 && <TargetWeightStep data={data} onChange={updateData} />}
                    {step === 5 && <GoalStep data={data} onChange={updateData} />}
                    {step === 6 && <ActivityStep data={data} onChange={updateData} />}
                    {step === 7 && <DietStep data={data} onChange={updateData} />}
                    {step === 8 && <RestrictionsStep data={data} onChange={updateData} />}
                    {step === 9 && <FoodPreferencesStep data={data} onChange={updateData} />}
                    {step === 10 && <EmailStep data={data} onChange={updateData} />}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      {!isGenerating && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/80 backdrop-blur-xl z-40">
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
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    Create My Plan
                    <Sparkles className="size-4 ml-2" />
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
                <ArrowRight className="size-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}