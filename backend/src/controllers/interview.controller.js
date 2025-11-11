import Interview from "../models/Interview.model.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc    Crear nueva entrevista
// @route   POST /api/interviews
// @access  Private
export const createInterview = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;

    const interview = await Interview.create(req.body);

    res.status(201).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener todas las entrevistas del usuario
// @route   GET /api/interviews
// @access  Private
export const getInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("evaluation");

    res.status(200).json({
      success: true,
      count: interviews.length,
      data: interviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener una entrevista por ID
// @route   GET /api/interviews/:id
// @access  Private
export const getInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate("userId", "name email")
      .populate("evaluation");

    if (!interview) {
      return next(new AppError("Entrevista no encontrada", 404));
    }

    // Verificar que la entrevista pertenece al usuario
    if (interview.userId._id.toString() !== req.user.id) {
      return next(
        new AppError("No tienes permisos para ver esta entrevista", 403)
      );
    }

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar entrevista
// @route   PUT /api/interviews/:id
// @access  Private
export const updateInterview = async (req, res, next) => {
  try {
    let interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(new AppError("Entrevista no encontrada", 404));
    }

    if (interview.userId.toString() !== req.user.id) {
      return next(
        new AppError("No tienes permisos para actualizar esta entrevista", 403)
      );
    }

    interview = await Interview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar entrevista
// @route   DELETE /api/interviews/:id
// @access  Private
export const deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(new AppError("Entrevista no encontrada", 404));
    }

    if (interview.userId.toString() !== req.user.id) {
      return next(
        new AppError("No tienes permisos para eliminar esta entrevista", 403)
      );
    }

    await interview.deleteOne();

    res.status(200).json({
      success: true,
      message: "Entrevista eliminada correctamente",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Iniciar entrevista
// @route   POST /api/interviews/:id/start
// @access  Private
export const startInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(new AppError("Entrevista no encontrada", 404));
    }

    if (interview.userId.toString() !== req.user.id) {
      return next(
        new AppError("No tienes permisos para iniciar esta entrevista", 403)
      );
    }

    interview.status = "in-progress";
    interview.scheduledDate = new Date();
    await interview.save();

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Completar entrevista
// @route   POST /api/interviews/:id/complete
// @access  Private
export const completeInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(new AppError("Entrevista no encontrada", 404));
    }

    if (interview.userId.toString() !== req.user.id) {
      return next(
        new AppError("No tienes permisos para completar esta entrevista", 403)
      );
    }

    await interview.markAsCompleted();

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    next(error);
  }
};
