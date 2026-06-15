"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Download,
  Flame,
  Dumbbell,
  Wheat,
  Droplets,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Lightbulb,
  Clock,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import type { MealPlanData, OnboardingData } from "@/types";

interface PlanPageProps {
  params: Promise<{ id: string }>;
}

export default function PlanPage({ params }: PlanPageProps) {
  const { id } = use(params);
  const [plan, setPlan] = useState<MealPlanData | null>(null);
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [activeTab, setActiveTab] = useState<"meals" | "shopping" | "tips">("meals");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(`/api/plan/${id}`);
        const result = await response.json();
        if (response.ok) {
          setPlan(result.plan);
          setUserData(result.userData);
        }
      } catch {
        console.error("Failed to fetch plan");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`/api/pdf/${id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Ketodine-meal-plan.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch {
      alert("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <Leaf className="size-8 text-primary mx-auto mb-4 animate-bounce" />
          <p className="text-muted-foreground">Loading your meal plan...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Plan Not Found</h1>
          <p className="text-muted-foreground mb-6">This meal plan doesn&apos;t exist or has expired.</p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const mealTypeColors: Record<string, string> = {
    breakfast: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    lunch: "bg-green-500/10 text-green-500 border-green-500/20",
    dinner: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    snack: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="size-5 text-primary" />
            <span className="font-bold tracking-tight">Ketodine</span>
          </Link>
          <Button
            onClick={handleDownloadPDF}
            disabled={downloading}
            size="sm"
            className="rounded-full shadow-lg shadow-primary/25"
          >
            <Download className="size-4" />
            {downloading ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Success Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 mb-4">
            <CheckCircle2 className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Your Meal Plan is Ready! 🎉
          </h1>
          {userData && (
            <p className="text-muted-foreground">
              Personalized for <strong className="text-foreground">{userData.name}</strong> — {plan.mealPlan.length}-day {userData.dietPreference} plan
            </p>
          )}
        </motion.div>

        {/* Nutrition Summary */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
              <CardContent className="p-4 text-center">
                <Flame className="size-5 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{plan.summary.dailyCalories}</p>
                <p className="text-xs text-muted-foreground">Calories/Day</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-500/10 to-transparent border-red-500/20">
              <CardContent className="p-4 text-center">
                <Dumbbell className="size-5 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{plan.summary.protein}g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
              <CardContent className="p-4 text-center">
                <Wheat className="size-5 text-amber-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{plan.summary.carbs}g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
              <CardContent className="p-4 text-center">
                <Droplets className="size-5 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{plan.summary.fat}g</p>
                <p className="text-xs text-muted-foreground">Fat</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-border pb-2">
          {[
            { key: "meals" as const, label: "Meal Plan", icon: <UtensilsCrossed className="size-4" /> },
            { key: "shopping" as const, label: "Shopping List", icon: <ShoppingCart className="size-4" /> },
            { key: "tips" as const, label: "Tips", icon: <Lightbulb className="size-4" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === tab.key
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Meal Plan Tab */}
        {activeTab === "meals" && (
          <div className="space-y-4">
            {plan.mealPlan.map((day) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: day.day * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => toggleDay(day.day)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary font-bold">
                        {day.day}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Day {day.day}</p>
                        <p className="text-xs text-muted-foreground">
                          {day.totalNutrition.calories} cal • {day.totalNutrition.protein}g protein
                        </p>
                      </div>
                    </div>
                    {expandedDays.has(day.day) ? (
                      <ChevronUp className="size-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="size-5 text-muted-foreground" />
                    )}
                  </button>

                  {expandedDays.has(day.day) && (
                    <CardContent className="pt-0 pb-4 space-y-4">
                      {day.meals.map((meal, mealIndex) => (
                        <div
                          key={mealIndex}
                          className="rounded-xl border border-border/50 p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`capitalize ${mealTypeColors[meal.type] || ""}`}
                                variant="outline"
                              >
                                {meal.type}
                              </Badge>
                              <h4 className="font-medium">{meal.name}</h4>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              {meal.prepTime}
                            </div>
                          </div>

                          {/* Nutrition */}
                          <div className="flex gap-4 text-xs">
                            <span className="text-orange-500">{meal.nutrition.calories} cal</span>
                            <span className="text-red-500">{meal.nutrition.protein}g protein</span>
                            <span className="text-amber-500">{meal.nutrition.carbs}g carbs</span>
                            <span className="text-blue-500">{meal.nutrition.fat}g fat</span>
                          </div>

                          {/* Ingredients */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Ingredients</p>
                            <div className="flex flex-wrap gap-1.5">
                              {meal.ingredients.map((ing, i) => (
                                <Badge key={i} variant="secondary" className="text-xs font-normal">
                                  {ing}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Instructions */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Instructions</p>
                            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                              {meal.instructions.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Shopping List Tab */}
        {activeTab === "shopping" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="size-5 text-primary" />
                  Shopping List
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const grouped = plan.shoppingList.reduce<Record<string, typeof plan.shoppingList>>(
                    (acc, item) => {
                      const cat = item.category || "Other";
                      if (!acc[cat]) acc[cat] = [];
                      acc[cat].push(item);
                      return acc;
                    },
                    {}
                  );

                  return (
                    <div className="space-y-6">
                      {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-sm text-primary mb-2">{category}</h3>
                          <div className="space-y-1.5">
                            {items.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-muted/50 text-sm"
                              >
                                <span>{item.item}</span>
                                <span className="text-muted-foreground">{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tips Tab */}
        {activeTab === "tips" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="size-5 text-primary" />
                  Nutrition Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center pb-8">
          <Button
            onClick={handleDownloadPDF}
            disabled={downloading}
            size="xl"
            className="rounded-full shadow-xl shadow-primary/30"
          >
            <Download className="size-5" />
            {downloading ? "Generating PDF..." : "Download Full PDF"}
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Save your complete meal plan as a printable PDF
          </p>
        </div>
      </div>
    </div>
  );
}
