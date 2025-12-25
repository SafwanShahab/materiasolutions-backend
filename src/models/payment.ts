import mongoose, { Schema, Document } from "mongoose";

interface IBillingInfo {
  firstName: string;
  middleInitial?: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface IPayment extends Document {
  invoiceNumber: string;
  amount: number;
  billing: IBillingInfo;
  bankReference: string;
  status: "pending" | "verified";
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    invoiceNumber: { type: String, required: true },
    amount: { type: Number, required: true },

    billing: {
      firstName: { type: String, required: true },
      middleInitial: { type: String },
      lastName: { type: String, required: true },
      company: { type: String },
      email: { 
        type: String, 
        required: true, 
        match: [/^\S+@\S+\.\S+$/, "Invalid email"] 
      },
      phone: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },

    bankReference: { type: String, required: true },

    status: { type: String, enum: ["pending", "verified"], default: "pending" },
  },
  { timestamps: true }
);

// Explicit collection name
export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema, "payments");
