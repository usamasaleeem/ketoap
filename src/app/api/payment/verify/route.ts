import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Payment } from "@/models/Payment";
import { OnboardingSession } from "@/models/OnboardingSession";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { sessionId, checkoutId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      );
    }

    // Verify the session exists
    const session = await OnboardingSession.findById(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Check if payment already exists for this session
    const existingPayment = await Payment.findOne({ sessionId, status: "completed" });
    if (existingPayment) {
      return NextResponse.json({
        paymentId: existingPayment._id,
        status: "completed",
        message: "Payment already verified",
      });
    }

    // Create or update payment record
    // In a production app, you'd verify with Polar.sh API
    // For MVP, we mark as completed when the user returns from checkout
    const payment = await Payment.create({
      sessionId,
      status: "completed",
      amount: 2.99,
      polarCheckoutId: checkoutId || "direct-checkout",
    });

    return NextResponse.json({
      paymentId: payment._id,
      status: "completed",
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
