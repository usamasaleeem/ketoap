// components/onboarding/GenderStep.tsx
"use client";

import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";
import { CheckCircle2, Sparkles, Users } from "lucide-react";

interface StepProps {
    data: OnboardingData;
    onChange: (updates: Partial<OnboardingData>) => void;
}

const genderOptions = [
    {
        value: "male",
        label: "Male",
        emoji: "👨",
        description: "Higher muscle mass",
        detailedDesc: "Higher testosterone levels, typically more muscle mass and different nutritional needs",
        color: "from-blue-500 to-cyan-500",
        bgColor: "blue-500",
        feature: "Muscle Focus"
    },
    {
        value: "female",
        label: "Female",
        emoji: "👩",
        description: "Different body composition",
        detailedDesc: "Higher estrogen levels, typically more body fat and different nutritional requirements",
        color: "from-pink-500 to-rose-500",
        bgColor: "pink-500",
        feature: "Hormonal Balance"
    },
    {
        value: "other",
        label: "Other",
        emoji: "🧑",
        description: "We respect your identity",
        detailedDesc: "Everyone's body is unique. We'll personalize your plan based on your individual needs.",
        color: "from-purple-500 to-indigo-500",
        bgColor: "purple-500",
        feature: "Inclusive"
    },
] as const;

export function GenderStep({ data, onChange }: StepProps) {
    const isSelected = (value: string) => data.gender === value;
    const selectedGender = genderOptions.find(g => g.value === data.gender);

    return (
        <div className="space-y-8">
            {/* Header */}


            {/* Gender Cards */}
            <div className="grid gap-3">
                {genderOptions.map((option, index) => {
                    const selected = isSelected(option.value);

                    return (
                        <motion.button
                            key={option.value}
                            type="button"
                            onClick={() => onChange({ gender: option.value })}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative w-full group transition-all duration-300 ${selected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                                }`}
                        >
                            <div
                                className={`relative w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 ${selected
                                    ? `border-${option.bgColor}/50 bg-gradient-to-br from-${option.bgColor}/10 to-transparent shadow-lg shadow-${option.bgColor}/10`
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

                                {/* Emoji with gradient background */}
                                <div
                                    className={`relative flex items-center justify-center size-14 rounded-2xl transition-all duration-300 flex-shrink-0 ${selected
                                        ? `bg-gradient-to-br ${option.color} shadow-lg`
                                        : 'bg-muted/50 group-hover:bg-muted'
                                        }`}
                                >
                                    <span className={`text-3xl transition-all duration-300 ${selected ? 'scale-110' : 'group-hover:scale-105'
                                        }`}>
                                        {option.emoji}
                                    </span>

                                    {/* Glow effect when selected */}
                                    {selected && (
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.color} blur-xl opacity-50 -z-10`} />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-lg font-semibold">
                                            {option.label}
                                        </span>
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
                                        {selected ? option.detailedDesc : option.description}
                                    </p>

                                    {/* Feature tag */}
                                    <div className="mt-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${selected
                                            ? `bg-${option.bgColor}/10 text-${option.bgColor}`
                                            : 'bg-muted/50 text-muted-foreground'
                                            }`}>
                                            {option.feature}
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow indicator */}
                                <div className={`flex-shrink-0 self-center transition-all duration-300 ${selected
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                                    }`}>
                                    <div className={`size-5 rounded-full flex items-center justify-center ${selected ? 'bg-primary/10' : ''
                                        }`}>
                                        <span className={`text-sm ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
                                            →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Selected gender summary */}
            {selectedGender && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border border-primary/10"
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedGender.color}`}>
                            <span className="text-2xl">{selectedGender.emoji}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">
                                    Gender: <span className="text-primary">{selectedGender.label}</span>
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {selectedGender.detailedDesc}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-muted-foreground">Personalized for</div>
                            <div className="text-sm font-medium text-primary">{selectedGender.feature}</div>
                        </div>
                    </div>
                </motion.div>
            )}


        </div>
    );
}