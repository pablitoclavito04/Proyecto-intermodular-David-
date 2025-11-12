import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { authService } from '../services';
import { useAuthStore } from '../store';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    if (!formData.email || !formData.password) {
      toast.error(t('errors.fillAllFields'));
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(formData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      useAuthStore.setState({ user, token });
      
      toast.success(t('auth.loginSuccess'));
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || t('errors.serverError');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          {t('auth.loginTitle')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('common.login')}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          {t('auth.noAccount')} 
          <a href="/register" className="text-blue-600 dark:text-blue-400 ml-1 font-bold hover:underline">
            {t('common.register')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
