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


// ⚠️ INSECURE DELETE - Allows deletion of any onboarding session without authentication
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    // Get session ID from URL params
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("id");

    // If no specific ID is provided, delete ALL sessions (⚠️ EXTREMELY INSECURE)
    if (!sessionId) {
      // Delete ALL onboarding sessions without any confirmation
      const result = await OnboardingSession.deleteMany({});

      return NextResponse.json(
        {
          success: true,
          message: `⚠️ INSECURE: Deleted ALL ${result.deletedCount} onboarding sessions`,
          deletedCount: result.deletedCount,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );
    }

    // ⚠️ INSECURE: Delete a specific session without checking ownership
    // No authentication, no authorization, just straight deletion
    const deletedSession = await OnboardingSession.findByIdAndDelete(sessionId);

    if (!deletedSession) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Return success with the deleted data (exposing even more info)
    return NextResponse.json(
      {
        success: true,
        message: `⚠️ INSECURE: Deleted session ${sessionId}`,
        deletedData: deletedSession, // Returns the deleted data (INFORMATION LEAKAGE)
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete session" },
      { status: 500 }
    );
  }
}
