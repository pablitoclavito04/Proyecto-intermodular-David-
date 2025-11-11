export const errorHandler = (err, req, res, next) => {
  // Log del error
  console.error("Error:", err.stack);

  // Error de Mongoose - Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors,
    });
  }

  // Error de Mongoose - CastError (ID inválido)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "ID de recurso inválido",
    });
  }

  // Error de Mongoose - Duplicate Key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `El ${field} ya existe en el sistema`,
    });
  }

  // Error de JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expirado",
    });
  }

  // Error genérico del servidor
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// Clase para errores personalizados
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
