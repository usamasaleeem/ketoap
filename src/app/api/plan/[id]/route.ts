import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MealPlan } from "@/models/MealPlan";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const mealPlan = await MealPlan.findById(id);
    if (!mealPlan) {
      return NextResponse.json(
        { error: "Meal plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      plan: mealPlan.plan,
      userData: mealPlan.userData,
      createdAt: mealPlan.createdAt,
    });
  } catch (error) {
    console.error("Fetch plan error:", error);
    return NextResponse.json(
      { error: "Failed to fetch meal plan" },
      { status: 500 }
    );
  }
}
