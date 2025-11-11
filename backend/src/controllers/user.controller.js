import User from "../models/User.model.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc    Obtener todos los usuarios
// @route   GET /api/users
// @access  Private
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un usuario por ID
// @route   GET /api/users/:id
// @access  Private
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return next(new AppError("Usuario no encontrado", 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar usuario
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res, next) => {
  try {
    // Solo el usuario puede actualizarse a sí mismo
    if (req.params.id !== req.user.id) {
      return next(
        new AppError("No tienes permisos para actualizar este usuario", 403)
      );
    }

    // Campos permitidos para actualización
    const allowedFields = ["name", "avatar"];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return next(new AppError("Usuario no encontrado", 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar usuario
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = async (req, res, next) => {
  try {
    // Solo el usuario puede eliminarse a sí mismo
    if (req.params.id !== req.user.id) {
      return next(
        new AppError("No tienes permisos para eliminar este usuario", 403)
      );
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("Usuario no encontrado", 404));
    }

    // Marcar como inactivo en lugar de eliminar
    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Usuario desactivado correctamente",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
