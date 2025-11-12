const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/register', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('firstName', 'First name is required').notEmpty(),
  check('lastName', 'Last name is required').notEmpty()
], authController.register);

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty()
], authController.login);

// Protected routes
router.get('/me', authMiddleware, authController.getMe);

router.put('/profile', authMiddleware, [
  check('firstName').optional().notEmpty(),
  check('lastName').optional().notEmpty()
], authController.updateProfile);

router.put('/change-password', authMiddleware, [
  check('currentPassword', 'Current password is required').notEmpty(),
  check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
], authController.changePassword);

module.exports = router;
