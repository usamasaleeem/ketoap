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
