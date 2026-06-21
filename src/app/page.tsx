"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  ShoppingCart,
  FileDown,
  ChefHat,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle2,
  Leaf,
} from "lucide-react";
import Link from "next/link";

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const benefits = [
  {
    icon: <Target className="size-6" />,
    title: "Goal-Focused Plans",
    description: "Whether it's weight loss, muscle gain, or maintenance — your plan is built for your specific goals.",
  },
  {
    icon: <ChefHat className="size-6" />,
    title: "Easy-to-Follow Recipes",
    description: "Simple, practical meals with clear ingredients and step-by-step instructions you'll actually enjoy.",
  },
  {
    icon: <ShoppingCart className="size-6" />,
    title: "Smart Shopping Lists",
    description: "Auto-generated grocery lists organized by category. Walk into the store and know exactly what to buy.",
  },
  {
    icon: <Zap className="size-6" />,
    title: "AI-Powered Precision",
    description: "Advanced AI calculates your optimal calories, macros, and nutrition based on real science.",
  },
  {
    icon: <Heart className="size-6" />,
    title: "Dietary Friendly",
    description: "Supports Keto, Vegan, Vegetarian, Halal, and Omnivore diets. Respects your allergies too.",
  },
  {
    icon: <FileDown className="size-6" />,
    title: "Downloadable PDF",
    description: "Take your meal plan anywhere. Download a clean, printable PDF of your complete plan.",
  },
];

const steps = [
  {
    step: "01",
    title: "Tell Us About You",
    description: "Fill out a quick form with your goals, preferences, and dietary needs.",
  },
  {
    step: "02",
    title: "Unlock Your Plan",
    description: "Make a one-time payment to generate your personalized meal plan.",
  },
  {
    step: "03",
    title: "Get Your AI Plan",
    description: "Our AI creates a custom meal plan with recipes, macros, and shopping list.",
  },
  {
    step: "04",
    title: "Start Eating Better",
    description: "Follow your plan, download the PDF, and start your transformation.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10">
              <Leaf className="size-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Ketodine</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">AI</Badge>
          </Link>
          <Link href="/onboarding">
            <Button size="sm" className="rounded-full shadow-lg shadow-primary/25">
              Get Started
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-chart-2/8 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Sparkles className="size-3.5 mr-1.5 text-primary" />
              AI-Powered Nutrition Planning
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
          >
            Your Perfect Meal Plan,{" "}
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Generated in Seconds
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
          >
            Tell us your goals, dietary preferences, and restrictions. Our AI creates a
            complete personalized meal plan with recipes, macros, and shopping lists.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
          >
            <Link href="/onboarding">
              <Button size="xl" className="rounded-full shadow-xl shadow-primary/30 text-base px-8">
                Generate My Meal Plan
                <ArrowRight className="size-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              One-time payment • No subscription
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
          >
            {[
              { value: "7-30", label: "Day Plans" },
              { value: "100%", label: "Personalized" },
              { value: "PDF", label: "Download" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 border-t border-border/50">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 px-3 py-1">Why Ketodine</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to{" "}
              <span className="text-primary">Eat Smarter</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Stop guessing what to eat. Get a science-backed plan that fits your lifestyle.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/15 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 px-3 py-1">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Four Simple Steps to{" "}
              <span className="text-primary">Better Nutrition</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                className="relative flex gap-4 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="flex-shrink-0 flex items-center justify-center size-12 rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-border/50">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-12 rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
            <CheckCircle2 className="size-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to Transform Your Diet?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands who&apos;ve taken control of their nutrition with AI-powered meal planning. Your personalized plan is just minutes away.
            </p>
            <Link href="/onboarding">
              <Button size="xl" className="rounded-full shadow-xl shadow-primary/30 text-base px-10">
                Generate My Meal Plan
                <ArrowRight className="size-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              One-time payment of $2.99 • Instant delivery
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="size-4 text-primary" />
            <span className="text-sm font-medium">Ketodine AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ketodine AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
