import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MealPlan } from "@/models/MealPlan";
import { renderToBuffer } from "@react-pdf/renderer";
import { MealPlanPDF } from "@/components/pdf/MealPlanPDF";
import React from "react";

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

    const buffer = await renderToBuffer(
      React.createElement(MealPlanPDF, {
        plan: mealPlan.plan,
        userData: mealPlan.userData as Record<string, string | number>,
      }) as any
    );

    return new NextResponse(buffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Ketodine-meal-plan.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
