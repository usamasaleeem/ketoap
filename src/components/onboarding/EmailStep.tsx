"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OnboardingData } from "@/types";
import { Mail } from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

export function EmailStep({ data, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="size-5 text-primary" />
          <Label htmlFor="email" className="text-lg">Where should we send your plan?</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your email address to receive your custom AI-generated meal plan and future updates.
        </p>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={data.email || ""}
          onChange={(e) => onChange({ email: e.target.value })}
          className="text-lg py-6"
        />
      </div>
    </div>
  );
}
