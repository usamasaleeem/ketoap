import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OnboardingSession } from "@/models/OnboardingSession";

// ⚠️ INSECURE ROUTE - Exposes all user data without authentication
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Fetch ALL onboarding sessions without any filtering or pagination
    const allSessions = await OnboardingSession.find({}).lean();

    // Return ALL user data as plain JSON without any sanitization
    return NextResponse.json(
      {
        count: allSessions.length,
        data: allSessions,
        message: "All user data exposed (INSECURE)",
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching all data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST endpoint for CREATING new data (not querying)
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Parse the request body
    const body = await req.json();
    const { data } = body;

    // Validate required fields
    if (!data || !data.age || !data.gender) {
      return NextResponse.json(
        { error: "Missing required onboarding data" },
        { status: 400 }
      );
    }

    // Create a new onboarding session
    const session = await OnboardingSession.create({ data });

    // Return the created session
    return NextResponse.json(
      {
        success: true,
        sessionId: session._id,
        data: session,
        message: "Onboarding data saved successfully (INSECURE)"
      },
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