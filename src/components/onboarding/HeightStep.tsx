// components/onboarding/HeightStep.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { OnboardingData } from "@/types";

interface StepProps {
    data: OnboardingData;
    onChange: (updates: Partial<OnboardingData>) => void;
}

export function HeightStep({ data, onChange }: StepProps) {
    return (
        <div className="space-y-6">


            <div className="pt-4">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">Height</span>
                    <span className="text-4xl font-bold text-primary">{data.height} cm</span>
                </div>
                <Slider
                    min={100}
                    max={250}
                    step={1}
                    value={[data.height]}
                    onValueChange={([val]) => onChange({ height: val })}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>100 cm</span>
                    <span>250 cm</span>
                </div>
            </div>
        </div>
    );
}