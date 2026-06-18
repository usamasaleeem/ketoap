// components/onboarding/TargetWeightStep.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import type { OnboardingData } from "@/types";

interface StepProps {
    data: OnboardingData;
    onChange: (updates: Partial<OnboardingData>) => void;
}

export function TargetWeightStep({ data, onChange }: StepProps) {
    const MIN = 30;
    const MAX = 200;

    const handleIncrement = () => {
        if (data.targetWeight < MAX) {
            onChange({ targetWeight: data.targetWeight + 1 });
        }
    };

    const handleDecrement = () => {
        if (data.targetWeight > MIN) {
            onChange({ targetWeight: data.targetWeight - 1 });
        }
    };

    const weightDifference = data.targetWeight - data.weight;
    const isGain = weightDifference > 0;
    const isLose = weightDifference < 0;

    return (
        <div className="space-y-6">
            <div className="pt-4">
                <div className="flex items-center justify-center gap-6 mb-6">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={handleDecrement}
                        disabled={data.targetWeight <= MIN}
                    >
                        <Minus className="h-6 w-6" />
                    </Button>

                    <div className="flex items-center">
                        <span className="text-4xl font-bold text-primary">{data.targetWeight}</span>
                        <span className="text-2xl text-muted-foreground ml-2">kg</span>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={handleIncrement}
                        disabled={data.targetWeight >= MAX}
                    >
                        <Plus className="h-6 w-6" />
                    </Button>
                </div>

                <Slider
                    min={MIN}
                    max={MAX}
                    step={1}
                    value={[data.targetWeight]}
                    onValueChange={([val]) => onChange({ targetWeight: val })}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{MIN} kg</span>
                    <span>{Math.round((MIN + MAX) / 2)} kg</span>
                    <span>{MAX} kg</span>
                </div>

                {data.targetWeight !== data.weight && (
                    <div className={`mt-4 p-3 rounded-lg ${isGain
                            ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                            : 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800'
                        }`}>
                        <p className="text-sm font-medium">
                            {isGain ? (
                                <span className="text-green-700 dark:text-green-400">
                                    🎯 You want to gain <strong>{Math.abs(weightDifference)} kg</strong>
                                </span>
                            ) : (
                                <span className="text-blue-700 dark:text-blue-400">
                                    🎯 You want to lose <strong>{Math.abs(weightDifference)} kg</strong>
                                </span>
                            )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Current: {data.weight} kg → Target: {data.targetWeight} kg
                        </p>
                    </div>
                )}

                {data.targetWeight === data.weight && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground text-center">
                            ⚖️ Your target weight is the same as your current weight
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}