const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  plan: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'expired'],
    default: 'active'
  },
  paypalSubscriptionId: {
    type: String,
    default: null
  },
  paypalTransactionId: {
    type: String,
    default: null
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  },
  renewalDate: {
    type: Date,
    default: null
  },
  price: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  features: {
    downloadReports: {
      type: Boolean,
      default: false
    },
    viewStatistics: {
      type: Boolean,
      default: false
    },
    customInterviews: {
      type: Boolean,
      default: true
    },
    voiceInterview: {
      type: Boolean,
      default: true
    },
    aiGeneratedQuestions: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
