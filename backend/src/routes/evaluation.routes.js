import express from "express";
import {
  getEvaluations,
  getEvaluation,
  createEvaluation,
  unlockDetailedEvaluation,
} from "../controllers/evaluation.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getEvaluations);
router.post("/", createEvaluation);
router.get("/:id", getEvaluation);
router.post("/:id/unlock", unlockDetailedEvaluation);

export default router;
