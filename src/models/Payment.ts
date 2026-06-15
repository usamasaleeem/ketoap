import mongoose, { Schema, type Document } from "mongoose";

export interface IPayment extends Document {
  sessionId: mongoose.Types.ObjectId;
  status: "pending" | "completed" | "failed";
  amount: number;
  polarCheckoutId: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: "OnboardingSession", required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    amount: { type: Number, required: true },
    polarCheckoutId: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Payment =
  mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
