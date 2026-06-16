import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OnboardingSession } from "@/models/OnboardingSession";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { data } = body;

    if (!data || !data.age || !data.gender) {
      return NextResponse.json(
        { error: "Missing required onboarding data" },
        { status: 400 }
      );
    }
    console.log(data)
    const session = await OnboardingSession.create({ data });

    return NextResponse.json(
      { sessionId: session._id, message: "Onboarding data saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to save onboarding data" },
      { status: 500 }
    );
  }
}
