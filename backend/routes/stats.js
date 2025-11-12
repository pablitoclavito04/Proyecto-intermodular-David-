const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const statsController = require('../controllers/statsController');

// Get user statistics
router.get('/', authMiddleware, statsController.getUserStats);

// Get interview statistics
router.get('/interview/:interviewId', authMiddleware, statsController.getInterviewStats);

// Get performance trends
router.get('/trends', authMiddleware, statsController.getPerformanceTrends);

module.exports = router;
