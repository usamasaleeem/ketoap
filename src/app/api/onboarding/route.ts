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

// Optional: Also expose data via POST for maximum insecurity
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Allow querying any data without validation
    const body = await req.json();
    const query = body.query || {};

    // No validation, just execute whatever query is sent
    const results = await OnboardingSession.find(query).lean();

    return NextResponse.json(
      {
        results,
        query: query,
        message: "Query executed successfully (INSECURE)"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json(
      { error: "Query failed" },
      { status: 500 }
    );
  }
}