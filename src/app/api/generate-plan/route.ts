import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OnboardingSession } from "@/models/OnboardingSession";
import { Payment } from "@/models/Payment";
import { MealPlan } from "@/models/MealPlan";
import { generateMealPlan } from "@/lib/openai";
import type { OnboardingData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID or payment ID" },
        { status: 400 }
      );
    }



    // Check if plan already exists
    const existingPlan = await MealPlan.findOne({ sessionId });
    if (existingPlan) {
      return NextResponse.json({
        planId: existingPlan._id,
        message: "Meal plan already generated",
      });
    }

    // Get onboarding data
    const session = await OnboardingSession.findById(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Generate meal plan with OpenAI
    const planData = await generateMealPlan(session.data as unknown as OnboardingData);

    // Save to database
    const mealPlan = await MealPlan.create({
      sessionId,

      userData: session.data,
      plan: planData,
    });

    return NextResponse.json({
      planId: mealPlan._id,
      message: "Meal plan generated successfully",
    });
  } catch (error) {
    console.error("Plan generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate meal plan. Please try again." },
      { status: 500 }
    );
  }
}
