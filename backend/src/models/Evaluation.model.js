import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    scores: {
      communication: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      technicalKnowledge: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      problemSolving: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      confidence: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      clarity: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
    },
    strengths: [
      {
        type: String,
        trim: true,
      },
    ],
    weaknesses: [
      {
        type: String,
        trim: true,
      },
    ],
    recommendations: [
      {
        type: String,
        trim: true,
      },
    ],
    detailedFeedback: {
      type: String,
      default: "",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    accessLevel: {
      type: String,
      enum: ["basic", "detailed"],
      default: "basic",
    },
  },
  {
    timestamps: true,
  }
);

// Índices
evaluationSchema.index({ interviewId: 1 });
evaluationSchema.index({ userId: 1 });
evaluationSchema.index({ overallScore: -1 });
evaluationSchema.index({ createdAt: -1 });

// Método para determinar si necesita pago
evaluationSchema.methods.requiresPayment = function () {
  return this.overallScore < 70 && !this.isPaid;
};

// Método para calcular el score promedio
evaluationSchema.methods.calculateAverageScore = function () {
  const {
    communication,
    technicalKnowledge,
    problemSolving,
    confidence,
    clarity,
  } = this.scores;
  return (
    (communication +
      technicalKnowledge +
      problemSolving +
      confidence +
      clarity) /
    5
  );
};

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;
