import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: [true, "El puesto de trabajo es obligatorio"],
      trim: true,
    },
    jobDescription: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number, // duración en minutos
      default: 0,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
    scheduledDate: {
      type: Date,
      default: Date.now,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    transcript: {
      type: String,
      default: "",
    },
    audioRecordingUrl: {
      type: String,
      default: null,
    },
    questions: [
      {
        question: String,
        answer: String,
        timestamp: Date,
      },
    ],
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices
interviewSchema.index({ userId: 1 });
interviewSchema.index({ scheduledDate: -1 });
interviewSchema.index({ status: 1 });
interviewSchema.index({ createdAt: -1 });

// Virtual para obtener la evaluación
interviewSchema.virtual("evaluation", {
  ref: "Evaluation",
  localField: "_id",
  foreignField: "interviewId",
  justOne: true,
});

// Método para marcar como completada
interviewSchema.methods.markAsCompleted = function () {
  this.status = "completed";
  this.completedDate = new Date();
  return this.save();
};

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
