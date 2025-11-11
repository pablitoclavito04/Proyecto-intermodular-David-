import Payment from "../models/Payment.model.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc    Crear pago
// @route   POST /api/payments
// @access  Private
export const createPayment = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;

    const payment = await Payment.create(req.body);

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener todos los pagos del usuario
// @route   GET /api/payments
// @access  Private
export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("interviewId", "jobTitle")
      .populate("evaluationId", "overallScore");

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un pago por ID
// @route   GET /api/payments/:id
// @access  Private
export const getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("interviewId")
      .populate("evaluationId");

    if (!payment) {
      return next(new AppError("Pago no encontrado", 404));
    }

    if (payment.userId.toString() !== req.user.id) {
      return next(new AppError("No tienes permisos para ver este pago", 403));
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Procesar pago
// @route   POST /api/payments/:id/process
// @access  Private
export const processPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return next(new AppError("Pago no encontrado", 404));
    }

    if (payment.userId.toString() !== req.user.id) {
      return next(
        new AppError("No tienes permisos para procesar este pago", 403)
      );
    }

    // Aquí iría la lógica de integración con Stripe/PayPal
    // Por ahora simulamos el proceso
    await payment.markAsCompleted();

    res.status(200).json({
      success: true,
      message: "Pago procesado correctamente",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};
