"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  CheckCircle2,
  Leaf,
  ArrowLeft,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [planDetails, setPlanDetails] = useState<{ planLength: number; mealsPerDay: number } | null>(null);

  useEffect(() => {
    const sid = sessionStorage.getItem("sessionId");
    const onboardingData = sessionStorage.getItem("onboardingData");

    if (!sid) {
      router.push("/onboarding");
      return;
    }

    setSessionId(sid);

    if (onboardingData) {
      try {
        const parsed = JSON.parse(onboardingData);
        setPlanDetails({ planLength: parsed.planLength, mealsPerDay: parsed.mealsPerDay });
      } catch {
        // ignore
      }
    }
  }, [router]);

  const handleCheckout = () => {
    // Hardcoded Polar.sh checkout link
    // In production, replace with your actual Polar.sh checkout URL
    const checkoutUrl = process.env.NEXT_PUBLIC_POLAR_CHECKOUT_URL ||
      `https://buy.polar.sh/your-product-checkout-link?metadata_sessionId=${sessionId}`;

    // For MVP: Store sessionId for post-payment verification and redirect
    sessionStorage.setItem("pendingPayment", "true");

    // Redirect to Polar.sh checkout
    window.open(checkoutUrl, "_blank");
  };

  const handleVerifyPayment = async () => {
    if (!sessionId) return;

    try {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const result = await response.json();
      if (response.ok) {
        sessionStorage.setItem("paymentId", result.paymentId);
        router.push("/generating");
      } else {
        alert(result.error || "Payment verification failed");
      }
    } catch {
      alert("Failed to verify payment. Please try again.");
    }
  };

  if (!sessionId) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="size-5 text-primary" />
            <span className="font-bold tracking-tight">Ketodine</span>
          </Link>
          <Badge variant="outline" className="text-xs">Checkout</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-chart-2/20">
                <Sparkles className="size-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Your AI Meal Plan</CardTitle>
              <CardDescription>
                Complete your purchase to generate your personalized plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan details */}
              <div className="rounded-xl bg-muted/50 p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plan Length</span>
                  <span className="font-medium">{planDetails?.planLength || 7} Days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Meals Per Day</span>
                  <span className="font-medium">{planDetails?.mealsPerDay || 3} Meals</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Meals</span>
                  <span className="font-medium">
                    {(planDetails?.planLength || 7) * (planDetails?.mealsPerDay || 3)} Recipes
                  </span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Includes</span>
                  <span className="font-medium text-primary">Shopping List + PDF</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-center py-4">
                <p className="text-4xl font-bold">
                  $2<span className="text-2xl">.99</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">One-time payment</p>
              </div>

              {/* Checkout button */}
              <Button
                onClick={handleCheckout}
                size="xl"
                className="w-full rounded-xl shadow-lg shadow-primary/25"
              >
                <CreditCard className="size-5" />
                Pay with Card
                <ExternalLink className="size-4" />
              </Button>

              {/* After payment button */}


              {/* Trust signals */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="size-3.5" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3.5" />
                  Instant Delivery
                </div>
              </div>

              {/* Back link */}
              <div className="text-center pt-2">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="size-3" />
                  Back to form
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
