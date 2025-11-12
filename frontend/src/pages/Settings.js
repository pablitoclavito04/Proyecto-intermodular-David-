import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../store';
import { toast } from 'react-toastify';
import { authService } from '../services';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

// Planes de suscripción
const SubscriptionPlans = [
  {
    key: 'free',
    name: 'Cuenta gratuita',
    description: 'Acceso básico y limitado a preguntas AI',
    price: '0€',
    features: [
      'Preguntas AI limitadas',
      'Gestión básica de entrevistas',
      'Sin estadísticas avanzadas',
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    description: 'Acceso completo a todas las funciones',
    price: '7.99€/mes',
    features: [
      'Preguntas AI ilimitadas',
      'Estadísticas avanzadas',
      'Descarga de informes',
      'Prioridad de soporte',
    ],
  },
];

const Settings = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguageStore();
  const [loading, setLoading] = useState(false);

  // Carga inicial desde localStorage solo si no hay usuario
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [showPlans, setShowPlans] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    profession: user?.profession || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // GET actual del usuario SIEMPRE desde backend al cargar Settings
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authService.getMe(); // GET /auth/me
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setProfileData({
          firstName: res.data.user?.firstName || '',
          lastName: res.data.user?.lastName || '',
          profession: res.data.user?.profession || ''
        });
      } catch (error) {
        toast.error('No se pudo actualizar el usuario.');
      }
    };
    fetchProfile();
  }, []);

  // Suscripción
  const subscription = user?.subscriptionStatus || 'free';

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
      toast.warning('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const response = await authService.updateProfile(profileData);
      const updatedUser = {
        ...user,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        profession: profileData.profession,
        ...response.data,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('userUpdated'));
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error updating profile';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword.trim() || !passwordData.newPassword.trim()) {
      toast.warning('Please fill in all fields');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error(t('auth.passwordMismatch') || 'Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.warning('Password must be at least 6 characters long');
      return;
    }
    setLoading(true);
    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      toast.success('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error changing password';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    const updatedUser = { ...user, language: lang };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success(`Language changed to ${lang}`);
  };

  // Upgrade usuario (solo lógica de frontend)
  const handleUpgrade = () => {
    toast.info('Redirigir a gestión de pago / upgrade');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <FiArrowLeft /> {t('Volver') || 'Back'}
          </button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('settings.title') || 'Settings'}
          </h1>
        </div>

        {/* SUSCRIPCIÓN */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Suscripción</h2>
          <div className="flex items-center gap-3 mb-3">
            <FiCheckCircle className={`text-2xl ${
              subscription === 'premium' ? 'text-green-500' : 'text-gray-400'
            }`} />
            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {subscription === 'premium' ? 'Premium' : 'Gratis'}
            </span>
          </div>
          <button
            onClick={() => setShowPlans(!showPlans)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Gestionar suscripción
          </button>
          {showPlans && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {SubscriptionPlans.map((plan) => (
                <div key={plan.key} className={`p-6 rounded-lg shadow transition ${
                  subscription === plan.key
                    ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border border-gray-200 dark:border-gray-700'
                }`}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {plan.name}
                    {subscription === plan.key && (
                      <span className="ml-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                        Actual
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{plan.description}</p>
                  <div className="font-bold text-2xl mb-3">{plan.price}</div>
                  <ul className="mb-4 list-disc ml-6">
                    {plan.features.map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>
                  {subscription !== plan.key && plan.key === 'premium' && (
                    <button
                      onClick={handleUpgrade}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Upgradear a Premium
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Perfil */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              {t('settings.profile') || 'Profile Settings'}
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('common.firstName') || 'First Name'}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('common.lastName') || 'Last Name'}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('common.profession') || 'Profession'}
                </label>
                <input
                  type="text"
                  name="profession"
                  value={profileData.profession}
                  onChange={handleProfileChange}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    {t('common.loading') || 'Loading...'}
                  </>
                ) : (
                  t('settings.updateProfile') || 'Update Profile'
                )}
              </button>
            </form>
          </div>
          {/* Contraseña */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              {t('settings.security') || 'Security'}
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.currentPassword') || 'Current Password'}
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.newPassword') || 'New Password'}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.confirmNewPassword') || 'Confirm New Password'}
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    {t('common.loading') || 'Loading...'}
                  </>
                ) : (
                  t('settings.changePassword') || 'Change Password'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Preferencias */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            {t('settings.preferences') || 'Preferences'}
          </h2>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.language') || 'Language'}
            </label>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Current User Info */}
        <div className="mt-8 bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Current User Email:</strong> {user?.email || 'N/A'}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>User ID:</strong> {user?._id || user?.id || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
