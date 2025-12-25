import { Router, Request, Response } from "express";
import Invoice from "../models/invoice";

const router = Router();

router.post("/lookup", async (req: Request, res: Response) => {
  try {
    let { invoiceNumber } = req.body;

    if (!invoiceNumber) {
      return res.status(400).json({ valid: false, message: "Invoice number required" });
    }

    // Convert to string and trim spaces
    invoiceNumber = String(invoiceNumber).trim();

    const invoice = await Invoice.findOne({ invoiceNumber });

    if (!invoice) {
      return res.status(404).json({ valid: false, message: "Invoice not found" });
    }

    res.json({
      valid: true,
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount,
      status: invoice.status,
      clientName: invoice.clientName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ valid: false, message: "Server error" });
  }
});



export default router;
