import express from "express";
import {
  register,
  login,
  getMe,
  updatePassword,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Rutas públicas
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

// Rutas protegidas
router.get("/me", protect, getMe);
router.put("/update-password", protect, updatePassword);

export default router;
