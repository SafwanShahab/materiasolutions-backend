import { Router, Request, Response } from "express";
import { Payment } from "../models/payment";
import Invoice from "../models/invoice";

const router = Router();

// POST /api/payments
router.post("/", async (req: Request, res: Response) => {
  try {
    const { invoiceNumber, amount, billing, bankReference } = req.body;

    // Basic validation
    if (!invoiceNumber || !amount || !billing || !billing.firstName || !billing.lastName || !billing.email || !bankReference) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check invoice exists
    const invoice = await Invoice.findOne({ invoiceNumber });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });

    // Prevent duplicate payments (same invoiceNumber + bankReference)
    const existingPayment = await Payment.findOne({ invoiceNumber, bankReference });
    if (existingPayment) return res.status(409).json({ success: false, message: "Payment already submitted" });

    // Create payment
    const payment = new Payment({ invoiceNumber, amount, billing, bankReference });
    
    await payment.save();

    invoice.status = "pending";
    await invoice.save();


    res.json({ success: true, message: "Payment submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
