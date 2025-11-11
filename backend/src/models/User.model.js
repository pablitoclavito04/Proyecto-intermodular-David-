import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      maxlength: [50, "El nombre no puede tener más de 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor proporciona un email válido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      select: false, // No devolver la contraseña en las consultas por defecto
    },
    subscription: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    subscriptionEndDate: {
      type: Date,
      default: null,
    },
    interviewsCompleted: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
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
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Virtual para obtener las entrevistas del usuario
userSchema.virtual("interviews", {
  ref: "Interview",
  localField: "_id",
  foreignField: "userId",
});

// Encriptar contraseña antes de guardar
userSchema.pre("save", async function (next) {
  // Solo encriptar si la contraseña ha sido modificada
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para verificar si la suscripción está activa
userSchema.methods.hasActiveSubscription = function () {
  if (this.subscription === "free") return false;
  if (!this.subscriptionEndDate) return false;
  return this.subscriptionEndDate > new Date();
};

const User = mongoose.model("User", userSchema);

export default User;
