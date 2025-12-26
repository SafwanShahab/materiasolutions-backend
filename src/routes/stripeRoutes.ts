import dotenv from "dotenv";
dotenv.config();

import { Router, Request, Response } from "express";
import Invoice from "../models/invoice";
import { Payment } from "../models/payment";

const router = Router();

// POST /api/payments/stripe
router.post("/", async (req: Request, res: Response) => {
  try {
    const { invoiceNumber, billing } = req.body;

    if (!invoiceNumber || !billing) {
      return res.status(400).json({ success: false, message: "Missing invoice or billing info" });
    }

    const invoice = await Invoice.findOne({ invoiceNumber });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: invoice.amount * 100, // in cents
      currency: "usd",
      receipt_email: billing.email,
      metadata: {
        invoiceNumber,
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      amount: invoice.amount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Stripe PaymentIntent failed" });
  }
});

export default router;
