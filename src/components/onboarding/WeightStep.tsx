// components/onboarding/WeightStep.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { OnboardingData } from "@/types";

interface StepProps {
    data: OnboardingData;
    onChange: (updates: Partial<OnboardingData>) => void;
}

export function WeightStep({ data, onChange }: StepProps) {
    return (
        <div className="space-y-6">


            <div className="pt-4">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">Current Weight</span>
                    <span className="text-4xl font-bold text-primary">{data.weight} kg</span>
                </div>
                <Slider
                    min={30}
                    max={200}
                    step={1}
                    value={[data.weight]}
                    onValueChange={([val]) => onChange({ weight: val })}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>30 kg</span>
                    <span>200 kg</span>
                </div>
            </div>
        </div>
    );
}