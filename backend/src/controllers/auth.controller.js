import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { AppError } from "../middlewares/errorHandler.js";

// Función auxiliar para generar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Crear usuario
    const user = await User.create({ name, email, password });

    // Generar token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          subscription: user.subscription,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return next(
        new AppError("Por favor proporciona email y contraseña", 400)
      );
    }

    // Buscar usuario y incluir contraseña
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Email o contraseña incorrectos", 401));
    }

    if (!user.isActive) {
      return next(new AppError("Tu cuenta ha sido desactivada", 401));
    }

    // Actualizar último login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generar token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          subscription: user.subscription,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener usuario autenticado
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar contraseña
// @route   PUT /api/auth/update-password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(
        new AppError(
          "Por favor proporciona la contraseña actual y la nueva",
          400
        )
      );
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!(await user.comparePassword(currentPassword))) {
      return next(new AppError("Contraseña actual incorrecta", 401));
    }

    user.password = newPassword;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Contraseña actualizada correctamente",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};
