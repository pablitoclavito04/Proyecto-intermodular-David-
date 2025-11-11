import Evaluation from "../models/Evaluation.model.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc    Crear evaluación
// @route   POST /api/evaluations
// @access  Private
export const createEvaluation = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;

    const evaluation = await Evaluation.create(req.body);

    res.status(201).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener todas las evaluaciones del usuario
// @route   GET /api/evaluations
// @access  Private
export const getEvaluations = async (req, res, next) => {
  try {
    const evaluations = await Evaluation.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("interviewId", "jobTitle completedDate");

    res.status(200).json({
      success: true,
      count: evaluations.length,
      data: evaluations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener una evaluación por ID
// @route   GET /api/evaluations/:id
// @access  Private
export const getEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
      .populate("interviewId")
      .populate("userId", "name email");

    if (!evaluation) {
      return next(new AppError("Evaluación no encontrada", 404));
    }

    if (evaluation.userId._id.toString() !== req.user.id) {
      return next(
        new AppError("No tienes permisos para ver esta evaluación", 403)
      );
    }

    // Si la evaluación requiere pago y no está pagada, limitar información
    if (evaluation.requiresPayment() && evaluation.accessLevel === "basic") {
      evaluation.detailedFeedback = null;
      evaluation.recommendations = [];
    }

    res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Desbloquear evaluación detallada (después de pago)
// @route   POST /api/evaluations/:id/unlock
// @access  Private
export const unlockDetailedEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);

    if (!evaluation) {
      return next(new AppError("Evaluación no encontrada", 404));
    }

    if (evaluation.userId.toString() !== req.user.id) {
      return next(
        new AppError("No tienes permisos para desbloquear esta evaluación", 403)
      );
    }

    evaluation.isPaid = true;
    evaluation.accessLevel = "detailed";
    await evaluation.save();

    res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    next(error);
  }
};
