const User = require('../models/User');

const checkSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('subscription');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if subscription is still valid
    if (user.subscriptionStatus === 'free') {
      if (user.freeTrialEndDate < new Date()) {
        user.subscriptionStatus = 'expired';
        await user.save();
        req.isPremium = false;
      } else {
        req.isPremium = true;
      }
    } else if (user.subscriptionStatus === 'premium') {
      req.isPremium = true;
    } else {
      req.isPremium = false;
    }

    req.userSubscription = user.subscription;
    req.userSubscriptionStatus = user.subscriptionStatus;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking subscription', error: error.message });
  }
};

module.exports = checkSubscription;
