import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiMic, FiBarChart2, FiLock } from 'react-icons/fi';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem('token');

  return (
    <div className="home home--dark">
      {/* Navigation */}
      <nav className="home__nav home__nav--dark">
        <div className="home__nav-container">
          <h1 className="home__logo home__logo--dark">
            {t('common.appName')}
          </h1>
          <div className="home__nav-actions">
            {token ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="home__nav-button home__nav-button--dashboard"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="home__nav-button home__nav-button--login home__nav-button--login--dark"
                >
                  {t('common.login')}
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="home__nav-button home__nav-button--register"
                >
                  {t('common.register')}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="home__hero">
        <h2 className="home__hero-title home__hero-title--dark">
          Master Your Interview Skills with AI
        </h2>
        <p className="home__hero-description home__hero-description--dark">
          Practice with realistic AI-generated questions, get instant feedback, and track your progress. Perfect preparation for your dream job.
        </p>
        {!token && (
          <button
            onClick={() => navigate('/register')}
            className="home__hero-button"
          >
            Get Started Free <FiArrowRight />
          </button>
        )}
      </section>

      {/* Features Section */}
      <section className="home__features home__features--dark">
        <div className="home__features-container">
          <h3 className="home__features-title home__features-title--dark">
            Why Choose Our Platform?
          </h3>
          <div className="home__features-grid">
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
      <section className="home__pricing">
        <div className="home__pricing-container">
          <h3 className="home__pricing-title home__pricing-title--dark">
            Simple, Transparent Pricing
          </h3>
          <div className="home__pricing-grid">
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
      <section className="home__cta">
        <div className="home__cta-container">
          <h3 className="home__cta-title">
            Ready to Transform Your Interview Skills?
          </h3>
          <p className="home__cta-description">
            Join thousands of professionals already practicing with our AI-powered interview platform
          </p>
          {!token && (
            <button
              onClick={() => navigate('/register')}
              className="home__cta-button"
            >
              Get Started Free Now
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="home__footer">
        <div className="home__footer-container">
          <p>&copy; 2024 AI Interview Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card feature-card--dark">
    <div className="feature-card__icon">
      {icon}
    </div>
    <h4 className="feature-card__title feature-card__title--dark">
      {title}
    </h4>
    <p className="feature-card__description feature-card__description--dark">
      {description}
    </p>
  </div>
);

const PricingCard = ({ plan, price, period, features, cta, featured }) => (
  <div className={`pricing-card ${featured ? 'pricing-card--featured' : 'pricing-card--dark'}`}>
    <h4 className={`pricing-card__plan ${featured ? 'pricing-card__plan--featured' : 'pricing-card__plan--dark'}`}>
      {plan}
    </h4>
    <div className={`pricing-card__price ${featured ? 'pricing-card__price--featured' : 'pricing-card__price--dark'}`}>
      {price}
    </div>
    {period && (
      <p className={`pricing-card__period ${featured ? 'pricing-card__period--featured' : 'pricing-card__period--dark'}`}>
        {period}
      </p>
    )}
    <ul className="pricing-card__features">
      {features.map((feature, i) => (
        <li key={i} className={`pricing-card__feature ${featured ? 'pricing-card__feature--featured' : 'pricing-card__feature--dark'}`}>
          {feature}
        </li>
      ))}
    </ul>
    <button className={`pricing-card__button ${featured ? 'pricing-card__button--premium' : 'pricing-card__button--free'}`}>
      {cta}
    </button>
  </div>
);

export default Home;
