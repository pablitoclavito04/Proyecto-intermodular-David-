import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { statsService, interviewService } from '../services';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiDownload, FiTrendingUp, FiAward, FiClock, FiPlus, FiSettings } from 'react-icons/fi';
import '../css/Dashboard.css';

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
      <div className="dashboard__loading">
        <div className="dashboard__loading-spinner"></div>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981'];

  return (
    <div className="dashboard dashboard--dark">
      <div className="dashboard__container">
        <div className="dashboard__header">
          <h1 className="dashboard__title dashboard__title--dark">
            {t('dashboard.title')}
          </h1>
          <div className="dashboard__actions">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              disabled={formLoading}
              className="dashboard__button dashboard__button--new"
            >
              <FiPlus /> {t('interview.newInterview')}
            </button>
            <button
              onClick={() => navigate('/interviews')}
              className="dashboard__button dashboard__button--interviews"
            >
              <FiAward /> {t('interview.myInterviews')}
            </button>
            <button
              onClick={downloadReport}
              className="dashboard__button dashboard__button--download"
            >
              <FiDownload /> {t('dashboard.downloadReport')}
            </button>
          </div>
        </div>

        {showCreateForm && (
          <div className="dashboard__form dashboard__form--dark">
            <h2 className="dashboard__form-title dashboard__form-title--dark">
              {t('interview.newInterview')}
            </h2>
            <form onSubmit={handleCreateInterview} className="dashboard__form-grid">
              <input
                type="text"
                placeholder="Interview Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="dashboard__form-input dashboard__form-input--dark"
                required
                disabled={formLoading}
              />
              <input
                type="text"
                placeholder="Profession (e.g., Frontend Developer)"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="dashboard__form-input dashboard__form-input--dark"
                required
                disabled={formLoading}
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="dashboard__form-input dashboard__form-input--dark"
                disabled={formLoading}
              >
                <option value="ai_generated">AI Generated</option>
                <option value="custom">Custom</option>
              </select>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="dashboard__form-input dashboard__form-input--dark"
                disabled={formLoading}
              >
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="dashboard__form-input dashboard__form-input--dark"
                disabled={formLoading}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
              <div className="dashboard__form-actions">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="dashboard__button dashboard__button--save"
                >
                  {formLoading ? (
                    <>
                      <div className="dashboard__spinner"></div>
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
                  className="dashboard__button dashboard__button--cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="dashboard__stats-grid">
          <StatCard
            title={t('dashboard.totalInterviews')}
            value={stats?.totalInterviews || 0}
            icon={<FiTrendingUp className="text-2xl" />}
            color="stat-card--blue"
          />
          <StatCard
            title={t('dashboard.completedInterviews')}
            value={stats?.completedInterviews || 0}
            icon={<FiAward className="text-2xl" />}
            color="stat-card--green"
          />
          <StatCard
            title={t('dashboard.averageScore')}
            value={`${stats?.averageScore || 0}%`}
            icon={<FiAward className="text-2xl" />}
            color="stat-card--purple"
          />
          <StatCard
            title={t('dashboard.totalDuration')}
            value={`${Math.round((stats?.totalDuration || 0) / 60)} min`}
            icon={<FiClock className="text-2xl" />}
            color="stat-card--orange"
          />
        </div>

        <div className="dashboard__charts-grid">
          <div className="dashboard__chart-card dashboard__chart-card--dark">
            <h2 className="dashboard__chart-title dashboard__chart-title--dark">
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
              <p className="dashboard__chart-empty dashboard__chart-empty--dark">{t('interview.noInterviews')}</p>
            )}
          </div>

          <div className="dashboard__chart-card dashboard__chart-card--dark">
            <h2 className="dashboard__chart-title dashboard__chart-title--dark">
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
              <p className="dashboard__chart-empty dashboard__chart-empty--dark">{t('interview.noInterviews')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card__content">
        <div>
          <p className="stat-card__title">{title}</p>
          <p className="stat-card__value">{value}</p>
        </div>
        <div className="stat-card__icon">{icon}</div>
      </div>
    </div>
  );
};

export default Dashboard;
