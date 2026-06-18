// components/onboarding/WeightStep.tsx
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

export function WeightStep({ data, onChange }: StepProps) {
    const MIN = 30;
    const MAX = 200;

    const handleIncrement = () => {
        if (data.weight < MAX) {
            onChange({ weight: data.weight + 1 });
        }
    };

    const handleDecrement = () => {
        if (data.weight > MIN) {
            onChange({ weight: data.weight - 1 });
        }
    };

    return (
        <div className="space-y-6">
            <div className="pt-4">
                <div className="flex items-center justify-center gap-6 mb-6">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={handleDecrement}
                        disabled={data.weight <= MIN}
                    >
                        <Minus className="h-6 w-6" />
                    </Button>

                    <div className="flex items-center">
                        <span className="text-4xl font-bold text-primary">{data.weight}</span>
                        <span className="text-2xl text-muted-foreground ml-2">kg</span>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={handleIncrement}
                        disabled={data.weight >= MAX}
                    >
                        <Plus className="h-6 w-6" />
                    </Button>
                </div>

                <Slider
                    min={MIN}
                    max={MAX}
                    step={1}
                    value={[data.weight]}
                    onValueChange={([val]) => onChange({ weight: val })}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{MIN} kg</span>
                    <span>{Math.round((MIN + MAX) / 2)} kg</span>
                    <span>{MAX} kg</span>
                </div>
            </div>
        </div>
    );
}