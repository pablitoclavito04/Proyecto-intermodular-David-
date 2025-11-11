import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      default: null,
    },
    evaluationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
      default: null,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "EUR",
      enum: ["EUR", "USD", "GBP"],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["card", "paypal", "stripe"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentFor: {
      type: String,
      required: true,
      enum: ["detailed_report", "subscription", "premium_access"],
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Índices
paymentSchema.index({ userId: 1 });
paymentSchema.index({ interviewId: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

// Método para marcar como completado
paymentSchema.methods.markAsCompleted = function () {
  this.status = "completed";
  return this.save();
};

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
