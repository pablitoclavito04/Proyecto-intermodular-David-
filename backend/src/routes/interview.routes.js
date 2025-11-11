import express from "express";
import {
  createInterview,
  getInterviews,
  getInterview,
  updateInterview,
  deleteInterview,
  startInterview,
  completeInterview,
} from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getInterviews).post(createInterview);

router
  .route("/:id")
  .get(getInterview)
  .put(updateInterview)
  .delete(deleteInterview);

router.post("/:id/start", startInterview);
router.post("/:id/complete", completeInterview);

export default router;
