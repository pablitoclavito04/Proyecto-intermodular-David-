const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/authController');

// These are already in auth.js but we can have additional user-specific routes here
router.get('/', authMiddleware, userController.getMe);

module.exports = router;
