const Subscription = require('../models/Subscription');
const User = require('../models/User');
const axios = require('axios');

// PayPal API endpoints
const PAYPAL_API = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api.paypal.com' 
  : 'https://api.sandbox.paypal.com';

// Get PayPal access token
const getPayPalAccessToken = async () => {
  try {
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
    
    const response = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('PayPal token error:', error);
    throw new Error('Failed to get PayPal access token');
  }
};

// Create payment
exports.createPayment = async (req, res) => {
  try {
    const { plan } = req.body;

    if (plan !== 'premium') {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    const priceMap = {
      premium: '9.99'
    };

    const price = priceMap[plan];

    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/payment/success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`
      },
      transactions: [
        {
          amount: {
            total: price,
            currency: 'USD',
            details: {
              subtotal: price,
              tax: '0',
              shipping: '0'
            }
          },
          description: `Premium Subscription - ${plan}`,
          item_list: {
            items: [
              {
                name: 'Premium Interview Package',
                sku: plan,
                price: price,
                currency: 'USD',
                quantity: 1
              }
            ]
          }
        }
      ]
    };

    const token = await getPayPalAccessToken();

    const response = await axios.post(`${PAYPAL_API}/v1/payments/payment`, paymentData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const approvalUrl = response.data.links.find(link => link.rel === 'approval_url');
    
    res.status(200).json({
      approvalUrl: approvalUrl.href,
      paymentId: response.data.id
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};

// Execute payment
exports.executePayment = async (req, res) => {
  try {
    const { paymentId, payerId } = req.body;

    const token = await getPayPalAccessToken();

    const response = await axios.post(
      `${PAYPAL_API}/v1/payments/payment/${paymentId}/execute`,
      { payer_id: payerId },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const payment = response.data;
    const transactionId = payment.transactions[0].related_resources[0].sale.id;

    let subscription = await Subscription.findOne({ userId: req.userId });

    if (!subscription) {
      subscription = new Subscription({ userId: req.userId });
    }

    subscription.plan = 'premium';
    subscription.status = 'active';
    subscription.paypalTransactionId = transactionId;
    subscription.paypalSubscriptionId = payment.id;
    subscription.startDate = Date.now();
    subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    subscription.renewalDate = subscription.endDate;
    subscription.price = parseFloat(payment.transactions[0].amount.total);
    subscription.currency = payment.transactions[0].amount.currency;
    subscription.features = {
      downloadReports: true,
      viewStatistics: true,
      customInterviews: true,
      voiceInterview: true,
      aiGeneratedQuestions: true
    };

    await subscription.save();

    const user = await User.findById(req.userId);
    user.subscription = subscription._id;
    user.subscriptionStatus = 'premium';
    await user.save();

    res.status(200).json({
      message: 'Payment successful',
      subscription,
      transactionId
    });
  } catch (error) {
    console.error('Execute payment error:', error);
    res.status(500).json({ message: 'Error executing payment', error: error.message });
  }
};

// Get subscription
exports.getSubscription = async (req, res) => {
  try {
    let subscription = await Subscription.findOne({ userId: req.userId });

    if (!subscription) {
      const user = await User.findById(req.userId);
      subscription = {
        plan: 'free',
        status: 'active',
        freeTrialEndDate: user.freeTrialEndDate,
        features: {
          downloadReports: false,
          viewStatistics: false,
          customInterviews: true,
          voiceInterview: true,
          aiGeneratedQuestions: true
        }
      };
    }

    res.status(200).json({ subscription });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ message: 'Error fetching subscription', error: error.message });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.userId });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.status = 'cancelled';
    subscription.endDate = Date.now();
    await subscription.save();

    const user = await User.findById(req.userId);
    user.subscriptionStatus = 'free';
    user.subscription = null;
    await user.save();

    res.status(200).json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ message: 'Error cancelling subscription', error: error.message });
  }
};

// Check premium access
exports.checkPremiumAccess = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('subscription');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPremium = user.subscriptionStatus === 'premium';

    res.status(200).json({
      isPremium,
      subscriptionStatus: user.subscriptionStatus,
      features: user.subscription?.features || {
        downloadReports: false,
        viewStatistics: false
      }
    });
  } catch (error) {
    console.error('Check premium error:', error);
    res.status(500).json({ message: 'Error checking premium status', error: error.message });
  }
};
