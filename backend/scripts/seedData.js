const User = require('../models/User');
const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/ai-interview');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Subscription.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const testUsers = [
      {
        email: 'user1@example.com',
        password: 'Password123',
        firstName: 'John',
        lastName: 'Doe',
        profession: 'Software Engineer',
        language: 'en'
      },
      {
        email: 'user2@example.com',
        password: 'Password123',
        firstName: 'Jane',
        lastName: 'Smith',
        profession: 'Product Manager',
        language: 'es'
      }
    ];

    const createdUsers = await User.insertMany(testUsers);
    console.log(`Created ${createdUsers.length} test users`);

    // Create subscriptions for test users
    const subscriptions = createdUsers.map(user => ({
      userId: user._id,
      plan: 'premium',
      status: 'active',
      features: {
        customInterviews: true,
        voiceInterview: true,
        aiGeneratedQuestions: true,
        downloadReports: false,
        viewStatistics: false
      }
    }));

    const createdSubscriptions = await Subscription.insertMany(subscriptions);
    console.log(`Created ${createdSubscriptions.length} subscriptions`);

    // Update users with subscription references
    for (let i = 0; i < createdUsers.length; i++) {
      createdUsers[i].subscription = createdSubscriptions[i]._id;
      createdUsers[i].subscriptionStatus = 'premium';
      await createdUsers[i].save();
    }

    console.log('✅ Database seeding completed successfully');
    console.log('\nTest Credentials:');
    console.log('Email: user1@example.com | Password: Password123');
    console.log('Email: user2@example.com | Password: Password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
