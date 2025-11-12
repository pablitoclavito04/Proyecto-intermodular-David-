import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { authService } from '../services';
import { useAuthStore } from '../store';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    language: 'en'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      toast.error(t('errors.fillAllFields'));
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register(formData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      useAuthStore.setState({ user, token });
      
      toast.success(t('auth.registerSuccess'));
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || t('errors.serverError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          {t('auth.registerTitle')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('common.firstName')}
            </label>
            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('common.firstName')}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('common.lastName')}
            </label>
            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t('common.lastName')}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('common.email')}
            </label>
            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('common.email')}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('common.password')}
            </label>
            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('common.password')}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('common.language')}
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('common.register')}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          {t('auth.haveAccount')} 
          <a href="/login" className="text-blue-600 dark:text-blue-400 ml-1 font-bold hover:underline">
            {t('common.login')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
