// components/ui/draggable-scale.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";

interface DraggableScaleProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
    className?: string;
    formatValue?: (value: number) => string;
}

export function DraggableScale({
    label,
    value,
    min,
    max,
    step = 1,
    unit = "",
    onChange,
    className,
    formatValue = (v) => v.toString(),
}: DraggableScaleProps) {
    const [isDragging, setIsDragging] = React.useState(false);
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    const percentage = ((value - min) / (max - min)) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const offsetX = info.point.x - rect.left;
        const clampedOffset = Math.max(0, Math.min(width, offsetX));
        const percentage = clampedOffset / width;
        const newValue = min + percentage * (max - min);
        const steppedValue = Math.round(newValue / step) * step;
        const finalValue = Math.max(min, Math.min(max, steppedValue));

        onChange(finalValue);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current || isDragging) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newValue = min + percentage * (max - min);
        const steppedValue = Math.round(newValue / step) * step;
        const finalValue = Math.max(min, Math.min(max, steppedValue));

        onChange(finalValue);
    };

    const getValueColor = () => {
        const range = max - min;
        const normalized = (value - min) / range;

        if (normalized < 0.3) return "from-blue-500 to-blue-400";
        if (normalized < 0.6) return "from-green-500 to-green-400";
        return "from-primary to-primary/70";
    };

    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <motion.span
                    className="text-2xl font-bold text-primary tabular-nums"
                    animate={{ scale: isDragging ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {formatValue(value)}{unit}
                </motion.span>
            </div>

            <div
                ref={sliderRef}
                className="relative h-2 rounded-full bg-muted cursor-pointer touch-none"
                onClick={handleClick}
            >
                {/* Track background */}
                <div className="absolute inset-0 rounded-full bg-muted" />

                {/* Filled track */}
                <motion.div
                    className={cn(
                        "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
                        getValueColor()
                    )}
                    style={{ width: `${clampedPercentage}%` }}
                    animate={{ width: `${clampedPercentage}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {/* Draggable handle */}
                <motion.div
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={sliderRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDrag={(event, info) => handleDrag(event, info)}
                    onDragEnd={() => setIsDragging(false)}
                    style={{
                        x,
                        left: `${clampedPercentage}%`,
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <div className="relative">
                        <div className="size-5 rounded-full bg-primary shadow-lg shadow-primary/30 border-2 border-background" />
                        {isDragging && (
                            <motion.div
                                className="absolute -inset-1 rounded-full bg-primary/20 blur-sm"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                            />
                        )}
                    </div>
                </motion.div>

                {/* Tick marks */}
                <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-0.5 h-1 bg-muted-foreground/20 rounded-full self-center"
                            style={{ opacity: i === 0 || i === 4 ? 0.4 : 0.2 }}
                        />
                    ))}
                </div>
            </div>

            {/* Value range indicators */}
            <div className="flex justify-between text-xs text-muted-foreground/60">
                <span>{min}{unit}</span>
                <span>{Math.round((min + max) / 2)}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    );
}