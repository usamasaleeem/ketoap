"use client";

import type { OnboardingData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sofa,
  Footprints,
  Bike,
  Flame,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Activity,
  Zap
} from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const activityLevels = [
  {
    value: "sedentary",
    label: "Sedentary",
    description: "Little or no exercise, desk job",
    detailedDesc: "Minimal daily movement. You spend most of your day sitting.",
    icon: <Sofa className="size-6" />,
    color: "from-gray-400 to-gray-500",
    bgColor: "gray-500",
    emoji: "🛋️",
    calories: "~1,800"
  },
  {
    value: "lightly-active",
    label: "Lightly Active",
    description: "Light exercise 1-3 days/week",
    detailedDesc: "Some light activity like walking or gentle workouts 1-3 times per week.",
    icon: <Footprints className="size-6" />,
    color: "from-blue-400 to-sky-500",
    bgColor: "blue-500",
    emoji: "🚶",
    calories: "~2,000"
  },
  {
    value: "moderately-active",
    label: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
    detailedDesc: "Regular exercise sessions like jogging, cycling, or gym workouts 3-5 times per week.",
    icon: <Bike className="size-6" />,
    color: "from-green-400 to-emerald-500",
    bgColor: "green-500",
    emoji: "🚴",
    calories: "~2,300"
  },
  {
    value: "very-active",
    label: "Very Active",
    description: "Heavy exercise 6-7 days/week",
    detailedDesc: "Intense daily training, physical job, or professional athlete level activity.",
    icon: <Flame className="size-6" />,
    color: "from-orange-400 to-red-500",
    bgColor: "orange-500",
    emoji: "🔥",
    calories: "~2,700"
  },
] as const;

export function ActivityStep({ data, onChange }: StepProps) {
  const selectedLevel = activityLevels.find(l => l.value === data.activityLevel);
  const isSelected = (value: string) => data.activityLevel === value;

  return (
    <div className="space-y-8">

      {/* Activity Cards Grid */}
      <div className="grid gap-3">
        {activityLevels.map((level, index) => {
          const selected = isSelected(level.value);

          return (
            <motion.button
              key={level.value}
              type="button"
              onClick={() => onChange({ activityLevel: level.value })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative w-full group transition-all duration-300 ${selected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
            >
              <div
                className={`relative w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 ${selected
                  ? `border-${level.bgColor}/50 bg-gradient-to-br from-${level.bgColor}/10 to-transparent shadow-lg shadow-${level.bgColor}/10`
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
                    ? `bg-gradient-to-br ${level.color} shadow-lg`
                    : 'bg-muted/50 group-hover:bg-muted'
                    }`}
                >
                  <div className={`transition-all duration-300 ${selected
                    ? 'text-white scale-110'
                    : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                    {level.icon}
                  </div>

                  {/* Glow effect when selected */}
                  {selected && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${level.color} blur-xl opacity-50 -z-10`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold">
                      {level.label}
                    </span>
                    <span className="text-sm">{level.emoji}</span>
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
                    {selected ? level.detailedDesc : level.description}
                  </p>
                </div>

                {/* Calorie indicator */}
                <div className={`flex-shrink-0 self-center text-center transition-all duration-300 ${selected ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'
                  }`}>
                  <div className="text-xs font-medium text-muted-foreground">Est. Daily</div>
                  <div className={`text-sm font-bold transition-colors ${selected ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                    {level.calories}
                  </div>
                  <div className="text-[10px] text-muted-foreground">calories</div>
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

      {/* Selected activity summary */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border border-primary/10"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedLevel.color}`}>
                <div className="text-white">
                  {selectedLevel.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">
                    Activity Level: <span className="text-primary">{selectedLevel.label}</span>
                  </p>
                  <span className="text-sm">{selectedLevel.emoji}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedLevel.detailedDesc}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Daily Estimate</div>
                <div className="text-lg font-bold text-primary">{selectedLevel.calories}</div>
                <div className="text-xs text-muted-foreground">calories</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}