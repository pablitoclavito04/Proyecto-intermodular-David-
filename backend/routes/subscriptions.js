const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const subscriptionController = require('../controllers/subscriptionController');

// Create payment
router.post('/create-payment', authMiddleware, subscriptionController.createPayment);

// Execute payment
router.post('/execute-payment', authMiddleware, subscriptionController.executePayment);

// Get subscription
router.get('/', authMiddleware, subscriptionController.getSubscription);

// Check premium access
router.get('/premium/check', authMiddleware, subscriptionController.checkPremiumAccess);

// Cancel subscription
router.delete('/', authMiddleware, subscriptionController.cancelSubscription);

module.exports = router;
