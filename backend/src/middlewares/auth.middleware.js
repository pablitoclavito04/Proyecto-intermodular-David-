import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { AppError } from "./errorHandler.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Verificar si el token existe en los headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("No estás autenticado. Por favor inicia sesión.", 401)
      );
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el usuario existe
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(
        new AppError("El usuario asociado a este token ya no existe.", 401)
      );
    }

    if (!user.isActive) {
      return next(new AppError("Tu cuenta ha sido desactivada.", 401));
    }

    // Agregar el usuario a la request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware para verificar roles (si lo necesitas en el futuro)
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("No tienes permisos para realizar esta acción.", 403)
      );
    }
    next();
  };
};
