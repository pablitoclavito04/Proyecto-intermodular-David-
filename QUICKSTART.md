# Quick Start Guide

## 🚀 Start Here

### Prerequisites
- Docker & Docker Compose
- OpenAI API Key
- PayPal Developer Account

### 1️⃣ Clone & Setup (2 minutes)
```bash
cd ai-interview-platform

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 2️⃣ Configure Credentials (3 minutes)
```bash
# Edit backend/.env
nano backend/.env
# Add: OPENAI_API_KEY=sk-...
# Add: PAYPAL_CLIENT_ID=your_id
# Add: PAYPAL_SECRET=your_secret

# Edit frontend/.env
nano frontend/.env
# Add: REACT_APP_PAYPAL_CLIENT_ID=your_id
```

### 3️⃣ Start Application (1 minute)
```bash
docker-compose up -d
```

### 4️⃣ Access Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000/api
- **MongoDB**: localhost:27017

### 5️⃣ Test Account
- Email: `user1@example.com`
- Password: `Password123`

---

## 📱 First Interview

1. **Register** or Login with test account
2. **Dashboard** - See your stats
3. **New Interview** - Create interview
   - Choose profession (e.g., Software Engineer)
   - Select difficulty (Junior/Mid/Senior)
   - Select type (AI-Generated or Custom)
4. **Practice** - Answer questions via voice or text
5. **Results** - Get AI feedback and scoring

---

## 🎯 Key Features

### Interview Types
- **AI Generated**: 5-10 contextual questions based on profession
- **Custom**: Add your own questions

### Voice Interview
- Real-time speech-to-text
- AI evaluation of responses
- Instant scoring (0-100)

### Dashboard
- Statistics & trends
- Interview history
- Performance tracking

### Premium ($9.99/month)
- Download reports
- Advanced analytics
- Extended access

---

## 📚 Documentation

- **README.md** - Full project overview
- **SETUP.md** - Detailed setup instructions
- **API.md** - API documentation
- **DEPLOYMENT.md** - Production deployment

---

## 🔧 Troubleshooting

### Can't connect to backend?
```bash
# Check if backend is running
docker-compose ps
# Should show: ai_interview_backend is running

# View logs
docker-compose logs backend
```

### Microphone not working?
- Check browser microphone permissions
- Try different browser
- Check microphone is connected

### PayPal not working?
- Verify credentials in .env
- Ensure using sandbox for testing
- Check return URLs in PayPal dashboard

### MongoDB issues?
```bash
# Restart MongoDB
docker-compose restart mongo

# Check MongoDB logs
docker-compose logs mongo
```

---

## 🚨 Important Notes

⚠️ **Before Production**
1. Change JWT_SECRET in backend/.env
2. Use PayPal LIVE credentials
3. Set NODE_ENV=production
4. Enable HTTPS/SSL
5. Setup proper database backups

🔐 **Security**
- Never commit .env files
- Use strong passwords
- Enable rate limiting
- Monitor logs regularly

📊 **Performance**
- Monitor memory usage
- Setup database indexing
- Use CDN for frontend assets
- Enable response caching

---

## 📞 Support

- Check documentation files
- Review API.md for endpoint details
- Check docker-compose logs
- Review error messages carefully

---

## Next Steps

1. **Customize**: Modify UI colors, add your branding
2. **Deploy**: Use DEPLOYMENT.md for production
3. **Scale**: Add more backend instances
4. **Monitor**: Setup monitoring & logging
5. **Backup**: Configure database backups

---

**Happy interviewing! 🎉**
