// components/onboarding/AgeStep.tsx
"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";

interface StepProps {
    data: OnboardingData;
    onChange: (updates: Partial<OnboardingData>) => void;
}

export function AgeStep({ data, onChange }: StepProps) {
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const MIN = 10;
    const MAX = 100;

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        updateValue(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            updateValue(e.clientX);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        updateValue(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging) {
            updateValue(e.touches[0].clientX);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const updateValue = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newValue = Math.round(MIN + percentage * (MAX - MIN));
        onChange({ age: newValue });
    };

    const percentage = ((data.age - MIN) / (MAX - MIN)) * 100;

    return (
        <div className="space-y-8">


            <div className="pt-8">
                <div className="flex items-center justify-center mb-8">
                    <span className="text-6xl font-bold text-primary">{data.age}</span>
                    <span className="text-2xl text-muted-foreground ml-2">years</span>
                </div>

                <div
                    ref={containerRef}
                    className="relative h-16 cursor-pointer select-none touch-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Track background */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full bg-muted" />

                    {/* Filled track */}
                    <div
                        className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-primary transition-all duration-100"
                        style={{ width: `${percentage}%` }}
                    />

                    {/* Scale markers */}
                    <div className="absolute top-full left-0 right-0 mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>{MIN}</span>
                        <span>{Math.round((MIN + MAX) / 2)}</span>
                        <span>{MAX}</span>
                    </div>

                    {/* Tick marks */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute top-0 h-2 w-0.5 -translate-y-1/2 bg-muted-foreground/30"
                                style={{ left: `${(i / 9) * 100}%` }}
                            />
                        ))}
                    </div>

                    {/* Draggable handle */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-transform ${isDragging ? "scale-110" : "scale-100"
                            }`}
                        style={{ left: `${percentage}%` }}
                    >
                        <div className="h-8 w-8 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-white/50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}