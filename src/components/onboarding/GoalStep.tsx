"use client";

import type { OnboardingData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  TrendingUp,
  Dumbbell,
  Flame,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const goals = [
  {
    value: "weight-loss",
    label: "Weight Loss",
    description: "Lose weight safely and sustainably",
    detailedDesc: "Create a calorie deficit while maintaining essential nutrients",
    icon: <Target className="size-6" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "blue-500",
    emoji: "🎯"
  },
  {
    value: "weight-gain",
    label: "Weight Gain",
    description: "Gain healthy weight with proper nutrition",
    detailedDesc: "Build mass with nutrient-dense, calorie-rich meals",
    icon: <TrendingUp className="size-6" />,
    color: "from-orange-500 to-red-500",
    bgColor: "orange-500",
    emoji: "📈"
  },
  {
    value: "muscle-gain",
    label: "Muscle Gain",
    description: "Build lean muscle with high protein meals",
    detailedDesc: "Optimize protein intake for muscle growth and recovery",
    icon: <Dumbbell className="size-6" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "purple-500",
    emoji: "💪"
  },
  {
    value: "fat-loss",
    label: "Fat Loss",
    description: "Reduce body fat while maintaining muscle",
    detailedDesc: "Target fat stores while preserving lean muscle mass",
    icon: <Flame className="size-6" />,
    color: "from-red-500 to-orange-500",
    bgColor: "red-500",
    emoji: "🔥"
  },
  {
    value: "maintenance",
    label: "Maintenance",
    description: "Maintain your current weight and health",
    detailedDesc: "Sustain your progress with balanced, healthy eating habits",
    icon: <Scale className="size-6" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "green-500",
    emoji: "⚖️"
  },
] as const;

export function GoalStep({ data, onChange }: StepProps) {
  const selectedGoal = goals.find(g => g.value === data.goal);
  const isSelected = (value: string) => data.goal === value;

  return (
    <div className="space-y-8">
      {/* Header with decorative element */}


      {/* Goal Cards Grid */}
      <div className="grid gap-3">
        {goals.map((goal, index) => {
          const selected = isSelected(goal.value);

          return (
            <motion.button
              key={goal.value}
              type="button"
              onClick={() => onChange({ goal: goal.value })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative w-full group transition-all duration-300 ${selected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
            >
              <div
                className={`relative w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 ${selected
                  ? `border-${goal.bgColor}/50 bg-gradient-to-br from-${goal.bgColor}/10 to-transparent shadow-lg shadow-${goal.bgColor}/10`
                  : 'border-border hover:border-primary/30 bg-background/50 hover:bg-muted/20'
                  }`}
              >
                {/* Selection indicator */}
                {selected && (
                  <div className="absolute -top-2 -right-2">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                      <div className="relative bg-primary rounded-full p-1">
                        <CheckCircle2 className="size-4 text-white" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Icon with gradient background */}
                <div
                  className={`relative flex items-center justify-center size-14 rounded-2xl transition-all duration-300 flex-shrink-0 ${selected
                    ? `bg-gradient-to-br ${goal.color} shadow-lg`
                    : 'bg-muted/50 group-hover:bg-muted'
                    }`}
                >
                  <div className={`transition-all duration-300 ${selected
                    ? 'text-white scale-110'
                    : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                    {goal.icon}
                  </div>

                  {/* Glow effect when selected */}
                  {selected && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${goal.color} blur-xl opacity-50 -z-10`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold">
                      {goal.label}
                    </span>
                    <span className="text-sm">{goal.emoji}</span>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                      >
                        Selected
                      </motion.span>
                    )}
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${selected ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                    {selected ? goal.detailedDesc : goal.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className={`flex-shrink-0 self-center transition-all duration-300 ${selected
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                  }`}>
                  <ArrowRight className={`size-5 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected goal summary */}
      <AnimatePresence>
        {selectedGoal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border border-primary/10"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedGoal.color}`}>
                {selectedGoal.icon}
              </div>
              <div>
                <p className="font-medium">
                  You're aiming for: <span className="text-primary">{selectedGoal.label}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedGoal.detailedDesc}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}