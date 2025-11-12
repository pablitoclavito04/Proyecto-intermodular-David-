# AI Interview Platform

## Quick Start

### With Docker (Recommended)

1. Configure environment variables:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Update with your API keys:
   - OpenAI API Key
   - PayPal Client ID and Secret

3. Start the application:
```bash
docker-compose up -d
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api
- MongoDB: localhost:27017

### Local Development

1. Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
cd ..
```

2. Configure .env files

3. Start MongoDB:
```bash
mongod
```

4. Start backend:
```bash
cd backend && npm run dev
```

5. Start frontend (in another terminal):
```bash
cd frontend && npm start
```

## Project Structure

```
ai-interview-platform/
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── scripts/             # Database scripts
│   ├── server.js            # Express server
│   └── package.json
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # Zustand stores
│   │   ├── i18n/            # Translations
│   │   ├── utils/           # Utilities
│   │   ├── App.js           # Main component
│   │   └── index.js         # Entry point
│   └── package.json
├── docker-compose.yml       # Docker configuration
└── README.md                # This file
```

## Key Features

✅ Voice-based interviews with AI
✅ Real-time transcription (Whisper API)
✅ AI-powered feedback and scoring
✅ Dark mode support
✅ Multi-language (8 languages)
✅ PayPal payment integration
✅ Comprehensive dashboard
✅ Performance analytics
✅ Fully dockerized
✅ Mobile responsive

## Test Credentials

After seeding:
- Email: user1@example.com
- Password: Password123

## API Documentation

See README.md for full API documentation.

## Troubleshooting

### Port already in use
- Backend: Change PORT in .env
- Frontend: PORT=3001 npm start
- MongoDB: Change port in docker-compose.yml

### Docker issues
```bash
# Rebuild images
docker-compose up -d --build

# View logs
docker-compose logs -f [service_name]

# Clean up
docker-compose down -v
```

### OpenAI errors
- Verify API key is valid
- Check API quota
- Review error messages in logs

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `OPENAI_API_KEY` - OpenAI API key
- `PAYPAL_CLIENT_ID` - PayPal client ID
- `PAYPAL_SECRET` - PayPal secret
- `PAYPAL_MODE` - sandbox or live
- `FRONTEND_URL` - Frontend URL

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_PAYPAL_CLIENT_ID` - PayPal client ID

## Support

For issues or questions, please refer to the main README.md file.
