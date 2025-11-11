import express from "express";
import {
  createPayment,
  getPayments,
  getPayment,
  processPayment,
} from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getPayments).post(createPayment);

router.get("/:id", getPayment);
router.post("/:id/process", processPayment);

export default router;
