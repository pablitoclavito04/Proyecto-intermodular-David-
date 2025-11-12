import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiMic, FiBarChart2, FiLock } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {t('common.appName')}
          </h1>
          <div className="flex gap-4">
            {token ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition"
                >
                  {t('common.login')}
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  {t('common.register')}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Master Your Interview Skills with AI
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Practice with realistic AI-generated questions, get instant feedback, and track your progress. Perfect preparation for your dream job.
        </p>
        {!token && (
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg flex items-center gap-2 mx-auto transition transform hover:scale-105"
          >
            Get Started Free <FiArrowRight />
          </button>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Our Platform?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiMic className="text-3xl" />}
              title="Voice Interviews"
              description="Practice with real-time voice interaction and get transcribed feedback"
            />
            <FeatureCard
              icon={<FiBarChart2 className="text-3xl" />}
              title="Analytics & Tracking"
              description="Monitor your progress with detailed statistics and performance trends"
            />
            <FeatureCard
              icon={<FiLock className="text-3xl" />}
              title="Secure & Private"
              description="Your data is encrypted and secure with industry-standard security"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PricingCard
              plan="Free"
              price="$0"
              features={[
                'Unlimited voice interviews',
                'AI-generated questions',
                '7 days free trial',
                'Basic feedback'
              ]}
              cta="Start Free"
            />
            <PricingCard
              plan="Premium"
              price="$9.99"
              period="per month"
              features={[
                'Everything in Free',
                'Download reports',
                'Advanced analytics',
                'Priority support'
              ]}
              cta="Upgrade Now"
              featured={true}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Interview Skills?
          </h3>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of professionals already practicing with our AI-powered interview platform
          </p>
          {!token && (
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              Get Started Free Now
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 AI Interview Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center hover:shadow-lg transition">
    <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
      {icon}
    </div>
    <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
      {title}
    </h4>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </div>
);

const PricingCard = ({ plan, price, period, features, cta, featured }) => (
  <div className={`rounded-lg p-8 ${featured ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white ring-2 ring-blue-400' : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'}`}>
    <h4 className={`text-2xl font-bold mb-2 ${!featured && 'text-gray-900 dark:text-white'}`}>
      {plan}
    </h4>
    <div className={`text-4xl font-bold mb-1 ${!featured && 'text-gray-900 dark:text-white'}`}>
      {price}
    </div>
    {period && (
      <p className={`text-sm mb-6 ${!featured && 'text-gray-600 dark:text-gray-400'}`}>
        {period}
      </p>
    )}
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="text-lg">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    <button className={`w-full py-2 rounded-lg font-bold transition ${featured ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
      {cta}
    </button>
  </div>
);

export default Home;
