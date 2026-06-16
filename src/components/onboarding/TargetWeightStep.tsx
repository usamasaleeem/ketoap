// components/onboarding/TargetWeightStep.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { OnboardingData } from "@/types";

interface StepProps {
    data: OnboardingData;
    onChange: (updates: Partial<OnboardingData>) => void;
}

export function TargetWeightStep({ data, onChange }: StepProps) {
    return (
        <div className="space-y-6">


            <div className="pt-4">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">Target Weight</span>
                    <span className="text-4xl font-bold text-primary">{data.targetWeight} kg</span>
                </div>
                <Slider
                    min={30}
                    max={200}
                    step={1}
                    value={[data.targetWeight]}
                    onValueChange={([val]) => onChange({ targetWeight: val })}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>30 kg</span>
                    <span>200 kg</span>
                </div>
                {data.targetWeight !== data.weight && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            {data.targetWeight > data.weight
                                ? `You want to gain ${data.targetWeight - data.weight} kg`
                                : `You want to lose ${data.weight - data.targetWeight} kg`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}