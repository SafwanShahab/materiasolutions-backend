import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  invoiceNumber: string;
  amount: number;
  status: "pending" | "paid" | "overdue" | "unpaid";
  clientName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema: Schema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["pending", "paid", "overdue", "unpaid"], 
      default: "pending" 
    },
    clientName: { type: String },
  },
  { timestamps: true }
);

// Explicit collection name
export default mongoose.model<IInvoice>("Invoice", InvoiceSchema, "invoices");
