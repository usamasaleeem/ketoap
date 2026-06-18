// components/onboarding/HeightStep.tsx
"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import type { OnboardingData } from "@/types";

interface StepProps {
    data: OnboardingData;
    onChange: (updates: Partial<OnboardingData>) => void;
}

export function HeightStep({ data, onChange }: StepProps) {
    const MIN = 100;
    const MAX = 250;

    const handleIncrement = () => {
        if (data.height < MAX) {
            onChange({ height: data.height + 1 });
        }
    };

    const handleDecrement = () => {
        if (data.height > MIN) {
            onChange({ height: data.height - 1 });
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
                        disabled={data.height <= MIN}
                    >
                        <Minus className="h-6 w-6" />
                    </Button>

                    <div className="flex items-center">
                        <span className="text-4xl font-bold text-primary">{data.height}</span>
                        <span className="text-2xl text-muted-foreground ml-2">cm</span>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={handleIncrement}
                        disabled={data.height >= MAX}
                    >
                        <Plus className="h-6 w-6" />
                    </Button>
                </div>

                <Slider
                    min={MIN}
                    max={MAX}
                    step={1}
                    value={[data.height]}
                    onValueChange={([val]) => onChange({ height: val })}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{MIN} cm</span>
                    <span>{Math.round((MIN + MAX) / 2)} cm</span>
                    <span>{MAX} cm</span>
                </div>
            </div>
        </div>
    );
}