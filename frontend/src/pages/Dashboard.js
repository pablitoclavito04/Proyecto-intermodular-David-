import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { statsService, interviewService } from '../services';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiDownload, FiTrendingUp, FiAward, FiClock, FiPlus, FiSettings } from 'react-icons/fi';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    profession: '',
    type: 'ai_generated',
    difficulty: 'mid',
    language: 'en'
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await statsService.getUserStats();
      setStats(response.data.stats);
      
      const trendsResponse = await statsService.getPerformanceTrends();
      setTrends(trendsResponse.data.trends);
      
      const user = JSON.parse(localStorage.getItem('user'));
      setIsPremium(user?.subscriptionStatus === 'premium');
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        totalInterviews: 0,
        completedInterviews: 0,
        averageScore: 0,
        totalDuration: 0,
        interviewsByProfession: {}
      });
      setTrends([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    if (!isPremium) {
      toast.warning(t('dashboard.needPremium'));
      return;
    }
    toast.info('Download feature coming soon');
  };

  const handleCreateInterview = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.profession.trim()) {
      toast.warning('Please fill in all required fields');
      return;
    }
    
    setFormLoading(true);
    
    try {
      let questions = [];
      
      if (formData.type === 'ai_generated') {
        toast.info('Generating questions with AI...');
        
        try {
          const questionsResponse = await interviewService.generateQuestions({
            profession: formData.profession,
            difficulty: formData.difficulty,
            language: formData.language,
            count: 5
          });
          
          console.log('🔍 Full Response:', questionsResponse);
          console.log('🔍 Response Data:', questionsResponse.data);
          
          // ✅ Extrae correctamente las preguntas
          questions = questionsResponse.data?.questions || [];
          
          console.log('✅ Questions extracted:', questions);
          console.log('✅ Total questions:', questions.length);
          
          if (!questions || questions.length === 0) {
            toast.error('Failed to generate questions. Please try again.');
            setFormLoading(false);
            return;
          }
          
          toast.success(`${questions.length} questions generated!`);
        } catch (genError) {
          console.error('❌ Error generating questions:', genError);
          toast.error('Error generating questions: ' + genError.message);
          setFormLoading(false);
          return;
        }
      } else {
        questions = [
          { question: "Question 1", difficulty: formData.difficulty },
          { question: "Question 2", difficulty: formData.difficulty },
          { question: "Question 3", difficulty: formData.difficulty },
          { question: "Question 4", difficulty: formData.difficulty },
          { question: "Question 5", difficulty: formData.difficulty }
        ];
      }

      console.log('📝 Creating interview with questions:', questions);

      const createResponse = await interviewService.createInterview({
        title: formData.title,
        profession: formData.profession,
        type: formData.type,
        difficulty: formData.difficulty,
        language: formData.language,
        questions: questions
      });

      console.log('✅ Interview created:', createResponse.data.interview);

      toast.success('Interview created successfully!');
      setShowCreateForm(false);
      setFormData({
        title: '',
        profession: '',
        type: 'ai_generated',
        difficulty: 'mid',
        language: 'en'
      });
      
      await fetchStats();

      const interviewId = createResponse.data.interview.id || createResponse.data.interview._id;
      console.log('🔀 Redirecting to interview:', interviewId);
      
      setTimeout(() => {
        navigate(`/interview/${interviewId}`);
      }, 500);
      
    } catch (error) {
      console.error('❌ Error creating interview:', error);
      const errorMessage = error.message || error.response?.data?.message || 'Error creating interview';
      toast.error(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('dashboard.title')}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              disabled={formLoading}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              <FiPlus /> {t('interview.newInterview')}
            </button>
            <button
              onClick={() => navigate('/interviews')}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              <FiAward /> {t('interview.myInterviews')}
            </button>
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <FiDownload /> {t('dashboard.downloadReport')}
            </button>
          </div>
        </div>

        {showCreateForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              {t('interview.newInterview')}
            </h2>
            <form onSubmit={handleCreateInterview} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Interview Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                required
                disabled={formLoading}
              />
              <input
                type="text"
                placeholder="Profession (e.g., Frontend Developer)"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                required
                disabled={formLoading}
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                disabled={formLoading}
              >
                <option value="ai_generated">AI Generated</option>
                <option value="custom">Custom</option>
              </select>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                disabled={formLoading}
              >
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                disabled={formLoading}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
              <div className="md:col-span-2 flex gap-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Creating...
                    </>
                  ) : (
                    'Create Interview'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  disabled={formLoading}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('dashboard.totalInterviews')}
            value={stats?.totalInterviews || 0}
            icon={<FiTrendingUp className="text-2xl" />}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title={t('dashboard.completedInterviews')}
            value={stats?.completedInterviews || 0}
            icon={<FiAward className="text-2xl" />}
            color="from-green-500 to-green-600"
          />
          <StatCard
            title={t('dashboard.averageScore')}
            value={`${stats?.averageScore || 0}%`}
            icon={<FiAward className="text-2xl" />}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title={t('dashboard.totalDuration')}
            value={`${Math.round((stats?.totalDuration || 0) / 60)} min`}
            icon={<FiClock className="text-2xl" />}
            color="from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              {t('dashboard.performanceTrends')}
            </h2>
            {trends && trends.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" name={t('interview.score')} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">{t('interview.noInterviews')}</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              {t('dashboard.scoreDistribution')}
            </h2>
            {stats?.interviewsByProfession && Object.keys(stats.interviewsByProfession).length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(stats.interviewsByProfession).map(([profession, count]) => ({
                      name: profession,
                      value: count
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.keys(stats.interviewsByProfession).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">{t('interview.noInterviews')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="opacity-50">{icon}</div>
      </div>
    </div>
  );
};

export default Dashboard;
