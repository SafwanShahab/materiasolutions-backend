import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import invoiceRoutes from "./routes/invoiceRoutes";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
