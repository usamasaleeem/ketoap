"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// Missing components imports
import { CalendarDays, Utensils } from "lucide-react";
import {
  CreditCard,
  Shield,
  CheckCircle2,
  Leaf,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Clock,
  Star,
  Users,
  Award,
  Flame,
  Zap,
  Gift,
  Lock,
  ChevronRight,
  CircleCheck,
  Truck,
  FileText,
  ShoppingBag,
  Heart,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [planDetails, setPlanDetails] = useState<{ planLength: number; mealsPerDay: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

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

  // Countdown timer for urgency
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckout = () => {
    const checkoutUrl = process.env.NEXT_PUBLIC_POLAR_CHECKOUT_URL ||
      `https://buy.polar.sh/your-product-checkout-link?metadata_sessionId=${sessionId}`;
    sessionStorage.setItem("pendingPayment", "true");
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

  const totalMeals = (planDetails?.planLength || 7) * (planDetails?.mealsPerDay || 3);
  const price = 4.99;
  const savings = 97; // Compared to similar plans

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Top bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Leaf className="size-5 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full -z-10" />
            </div>
            <span className="font-bold tracking-tight">Ketodine</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs border-primary/30 bg-primary/5">
              <Shield className="size-3 mr-1" />
              Secure
            </Badge>
            <Badge variant="outline" className="text-xs border-green-500/30 bg-green-500/5 text-green-600">
              <CheckCircle2 className="size-3 mr-1" />
              Trusted
            </Badge>
          </div>
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
          {/* Trust Badge */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm gap-2">
              <Users className="size-4" />
              2,847+ meals generated this week
            </Badge>
          </motion.div>

          <Card className="border-primary/20 shadow-2xl shadow-primary/10 relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />

            {/* Special Offer Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white animate-pulse">
                <Zap className="size-3 mr-1" />
                Limited Time
              </Badge>
            </div>

            <CardHeader className="text-center pb-4 pt-8">


              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Your AI Meal Plan
              </CardTitle>
              <CardDescription className="text-base">
                Get your personalized keto meal plan in minutes
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Urgency Timer */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-2 border border-border/50">
                <Clock className="size-4 text-orange-500 animate-pulse" />
                <span>Complete checkout in</span>
                <span className="font-mono font-bold text-orange-500 text-base">
                  {formatTime(timeLeft)}
                </span>
                <span>to secure your price</span>
              </div>

              {/* Plan details - Enhanced */}
              <div className="rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 p-5 space-y-3 border border-primary/10">
                <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                  <Crown className="size-4" />
                  Your Premium Plan Includes
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm bg-background/50 rounded-lg p-2">
                    <CalendarDays className="size-4 text-primary" />
                    <div>
                      <div className="font-medium">{planDetails?.planLength || 7} Days</div>
                      <div className="text-xs text-muted-foreground">Meal Plan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-background/50 rounded-lg p-2">
                    <Utensils className="size-4 text-primary" />
                    <div>
                      <div className="font-medium">{planDetails?.mealsPerDay || 3} Meals</div>
                      <div className="text-xs text-muted-foreground">Per Day</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CircleCheck className="size-4 text-green-500" />
                    <span>{totalMeals} Delicious Keto Recipes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CircleCheck className="size-4 text-green-500" />
                    <span>Smart Shopping List Included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CircleCheck className="size-4 text-green-500" />
                    <span>Printable PDF Format</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CircleCheck className="size-4 text-green-500" />
                    <span>Macro Tracking & Nutrition Info</span>
                  </div>
                </div>
              </div>

              {/* Price Section - Enhanced */}
              <div className="text-center py-3 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="flex items-center justify-center gap-4 mb-1">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      ${price}
                    </span>
                    <span className="text-xl text-muted-foreground ml-1">USD</span>
                  </div>
                  <div className="text-left">
                    <div className="line-through text-sm text-muted-foreground">$99.99</div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                      Save ${savings}%
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  One-time payment · Instant access
                </p>
              </div>

              {/* Main CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleCheckout}
                  size="xl"
                  className="w-full rounded-xl shadow-lg shadow-primary/30 relative overflow-hidden group"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    <CreditCard className="size-5" />
                    Get My Personalized Plan Now
                    <ChevronRight className={`size-4 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
                  </span>
                </Button>
              </motion.div>

              {/* Trust Signals - Enhanced */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                  <div className="p-2 rounded-full bg-green-500/10">
                    <Lock className="size-4 text-green-500" />
                  </div>
                  <span>Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <Truck className="size-4 text-blue-500" />
                  </div>
                  <span>Instant</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                  <div className="p-2 rounded-full bg-purple-500/10">
                    <Heart className="size-4 text-purple-500" />
                  </div>
                  <span>Loved</span>
                </div>
              </div>



            </CardContent>
          </Card>

        </motion.div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-primary/5 animate-float">
          <Leaf className="size-24" />
        </div>
        <div className="absolute bottom-20 right-10 text-primary/5 animate-float-delayed">
          <Sparkles className="size-20" />
        </div>
      </div>
    </div>
  );
}
