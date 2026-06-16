"use client";

import { useState } from "react";
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
  Gift
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
  { title: "Your Health Summary", description: "Here's what we've learned about you" },
  { title: "Where to send?", description: "We'll send your plan here" },
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

// Helper function to calculate BMI
const calculateBMI = (weight: number, height: number) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// Helper function to get BMI category
const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { label: "Underweight", color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/20", emoji: "⚖️", description: "You may need to gain some weight" };
  if (bmi < 25) return { label: "Healthy", color: "text-green-500", bgColor: "bg-green-500/10", borderColor: "border-green-500/20", emoji: "💪", description: "You're in a healthy range!" };
  if (bmi < 30) return { label: "Overweight", color: "text-orange-500", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/20", emoji: "📈", description: "Some weight loss could benefit you" };
  return { label: "Obese", color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/20", emoji: "⚠️", description: "Weight loss is recommended for health" };
};

// Helper function to get motivational quote
const getMotivationalQuote = (goal: string) => {
  const quotes = {
    "weight-loss": {
      quote: "The journey of a thousand miles begins with a single step.",
      author: "Lao Tzu",
      icon: TrendingDown,
      color: "from-blue-500 to-cyan-500"
    },
    "weight-gain": {
      quote: "Strength does not come from physical capacity. It comes from an indomitable will.",
      author: "Mahatma Gandhi",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    },
    "maintain": {
      quote: "Health is a state of complete harmony of the body, mind and spirit.",
      author: "B.K.S. Iyengar",
      icon: Heart,
      color: "from-green-500 to-emerald-500"
    },
    "muscle-gain": {
      quote: "The only bad workout is the one that didn't happen.",
      author: "Unknown",
      icon: Dumbbell,
      color: "from-purple-500 to-pink-500"
    },
    "fat-loss": {
      quote: "Success is the sum of small efforts repeated day in and day out.",
      author: "Robert Collier",
      icon: Flame,
      color: "from-red-500 to-orange-500"
    }
  };
  return quotes[goal as keyof typeof quotes] || quotes["weight-loss"];
};

// Summary Step Component - Enhanced Premium Version
function HealthSummaryStep({ data }: { data: OnboardingData }) {
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);
  const weightDiff = data.targetWeight - data.weight;
  const quote = getMotivationalQuote(data.goal);
  const QuoteIcon = quote.icon;

  const totalMeals = data.planLength * data.mealsPerDay;

  return (
    <div className="space-y-6">
      {/* Premium Badge */}


      {/* Main Stats Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border border-primary/10 p-6">
        <div className="absolute top-0 right-0 opacity-5">
          <Crown className="size-32" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Brain className="size-5 text-primary" />
              </div>
              <span className="text-sm font-medium">Health Score</span>
            </div>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
              <CheckCircle2 className="size-3 mr-1" />
              Optimized
            </Badge>
          </div>

          {/* BMI Circle */}
          <div className="flex items-center justify-center gap-8">
            <div className="relative">
              <svg className="size-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className={`${bmiCategory.color}`}
                  strokeDasharray={`${(bmi / 40) * 301.6} 301.6`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-bold ${bmiCategory.color}`}>
                  {bmi.toFixed(1)}
                </span>
                <span className="text-[10px] text-muted-foreground">BMI</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{bmiCategory.emoji}</span>
                <div>
                  <p className={`text-lg font-bold ${bmiCategory.color}`}>
                    {bmiCategory.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {bmiCategory.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Progress:</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000`}
                    style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-medium">
                  {Math.round((bmi / 40) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Enhanced */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl p-4 text-center border border-blue-500/10 hover:border-blue-500/30 transition-all cursor-default"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="size-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-blue-500">
            {data.targetWeight}kg
          </div>
          <div className="text-[10px] text-muted-foreground capitalize">
            {data.goal.replace('-', ' ')}
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-xl p-4 text-center border border-purple-500/10 hover:border-purple-500/30 transition-all cursor-default"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Activity className="size-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold text-purple-500 capitalize truncate">
            {data.activityLevel.split('-')[0]}
          </div>
          <div className="text-[10px] text-muted-foreground capitalize">
            {data.dietPreference}
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl p-4 text-center border border-green-500/10 hover:border-green-500/30 transition-all cursor-default"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Calendar className="size-4 text-green-500" />
          </div>
          <div className="text-xl font-bold text-green-500">
            {data.age}
          </div>
          <div className="text-[10px] text-muted-foreground capitalize">
            {data.gender}
          </div>
        </motion.div>
      </div>

      {/* Plan Preview */}
      <div className="rounded-xl bg-muted/30 p-4 border border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="size-4 text-primary" />
          <span className="text-sm font-medium">Your Plan Includes</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{data.planLength}</div>
            <div className="text-[10px] text-muted-foreground">Days</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{data.mealsPerDay}</div>
            <div className="text-[10px] text-muted-foreground">Meals/Day</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{totalMeals}</div>
            <div className="text-[10px] text-muted-foreground">Total Meals</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">✓</div>
            <div className="text-[10px] text-muted-foreground">Shopping List</div>
          </div>
        </div>
      </div>

      {/* Motivational Quote - Enhanced */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-purple-600 p-6 text-white shadow-xl shadow-primary/20">
        <div className="absolute top-0 right-0 opacity-10">
          <QuoteIcon className="size-32" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-5">
          <Sparkles className="size-48" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-full bg-white/20">
              <Star className="size-3.5 text-yellow-300" />
            </div>
            <span className="text-xs font-medium text-yellow-300/80 uppercase tracking-wider">
              Your Motivation
            </span>
          </div>

          <p className="text-lg font-medium leading-relaxed">
            "{quote.quote}"
          </p>

          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-white/70">
              — {quote.author}
            </p>
            <Badge className="bg-white/10 text-white border-white/20">
              <Sparkles className="size-3 mr-1" />
              Daily Inspiration
            </Badge>
          </div>
        </div>
      </div>

      {/* Ready to Start */}
      <motion.div
        className="text-center space-y-2 p-6 rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border border-primary/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="size-5 text-primary animate-pulse" />
          <p className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Your Personalized Plan is Ready!
          </p>
          <Sparkles className="size-5 text-primary animate-pulse" />
        </div>
        <p className="text-sm text-muted-foreground">
          We've analyzed your data and created a custom meal plan just for you.
          <br />
          <span className="text-primary font-medium">Enter your email to unlock your plan.</span>
        </p>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Shield className="size-3 text-primary" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3 text-primary" />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="size-3 text-primary" />
            <span>Personalized</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Calendar icon component
function Calendar(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Validation logic for each step
  const getCanProceed = () => {
    switch (step) {
      case 0: // Age
        return data.age >= 10 && data.age <= 100;
      case 1: // Gender
        return data.gender !== "";
      case 2: // Height
        return data.height >= 100 && data.height <= 250;
      case 3: // Weight
        return data.weight >= 30 && data.weight <= 200;
      case 4: // Target Weight
        return data.targetWeight >= 30 && data.targetWeight <= 200;
      case 10: // Health Summary - always proceed
        return true;
      case 11: // Email (last step)
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
              {step === 10 && <HealthSummaryStep data={data} />}
              {step === 11 && <EmailStep data={data} onChange={updateData} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
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
                  Continue
                  <ArrowRight className="size-4 ml-1" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="rounded-full shadow-lg shadow-primary/25 px-8"
            >
              {step === 10 ? "Continue to Email" : "Next"}
              <ArrowRight className="size-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}