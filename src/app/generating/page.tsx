"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Loader2, ChefHat, Sparkles, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const loadingSteps = [
  { label: "Analyzing your profile...", icon: <Sparkles className="size-5" /> },
  { label: "Calculating nutrition targets...", icon: <ChefHat className="size-5" /> },
  { label: "Creating personalized recipes...", icon: <ChefHat className="size-5" /> },
  { label: "Building your shopping list...", icon: <CheckCircle2 className="size-5" /> },
];

export default function GeneratingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
      router.push("/onboarding");
      return;
    }

    // Animate through loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 3000);

    // Generate the plan
    const generatePlan = async () => {
      try {
        const response = await fetch("/api/generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const result = await response.json();
        if (response.ok) {
          clearInterval(stepInterval);
          // Short delay to show completion
          setTimeout(() => {
            router.push(`/plan/${result.planId}`);
          }, 1500);
        } else {
          clearInterval(stepInterval);
          setError(result.error || "Failed to generate meal plan");
        }
      } catch {
        clearInterval(stepInterval);
        setError("Something went wrong. Please try again.");
      }
    };

    generatePlan();

    return () => clearInterval(stepInterval);
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="size-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">😔</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Generation Failed</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Leaf className="size-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">Ketodine</span>
        </motion.div>

        {/* Spinner */}
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
        <div className="space-y-3 text-left max-w-xs mx-auto">
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
    </div>
  );
}
