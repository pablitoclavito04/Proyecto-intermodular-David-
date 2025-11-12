# API Documentation

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe",
  "language": "en"
}

Response: 201 Created
{
  "token": "jwt_token",
  "user": { ... }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}

Response: 200 OK
{
  "token": "jwt_token",
  "user": { ... }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "user": { ... }
}
```

#### Update Profile
```
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "profession": "Engineer"
}

Response: 200 OK
```

#### Change Password
```
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123"
}

Response: 200 OK
```

### Interviews

#### Generate AI Questions
```
POST /api/interviews/generate-questions
Authorization: Bearer <token>
Content-Type: application/json

{
  "profession": "Software Engineer",
  "difficulty": "mid",
  "language": "en",
  "count": 5
}

Response: 200 OK
{
  "questions": [ ... ]
}
```

#### Create Interview
```
POST /api/interviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Software Engineer Interview",
  "profession": "Software Engineer",
  "type": "ai_generated",
  "difficulty": "mid",
  "language": "en",
  "questions": [ ... ]
}

Response: 201 Created
{
  "interview": { ... }
}
```

#### Get All Interviews
```
GET /api/interviews
Authorization: Bearer <token>

Response: 200 OK
{
  "count": 5,
  "interviews": [ ... ]
}
```

#### Get Interview
```
GET /api/interviews/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "interview": { ... }
}
```

#### Update Interview Status
```
PUT /api/interviews/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}

Response: 200 OK
```

#### Delete Interview
```
DELETE /api/interviews/:id
Authorization: Bearer <token>

Response: 200 OK
```

### Responses

#### Submit Response
```
POST /api/responses
Authorization: Bearer <token>
Content-Type: application/json

{
  "questionId": "id",
  "interviewId": "id",
  "responseText": "My answer...",
  "duration": 120
}

Response: 201 Created
{
  "response": { ... }
}
```

#### Get Responses
```
GET /api/responses/interview/:interviewId
Authorization: Bearer <token>

Response: 200 OK
{
  "count": 5,
  "responses": [ ... ]
}
```

### Statistics

#### Get User Statistics
```
GET /api/stats
Authorization: Bearer <token>

Response: 200 OK
{
  "stats": {
    "totalInterviews": 10,
    "completedInterviews": 8,
    "averageScore": 78,
    "totalDuration": 3600,
    "interviewsByMonth": { ... },
    "interviewsByProfession": { ... }
  }
}
```

#### Get Interview Statistics
```
GET /api/stats/interview/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "stats": { ... }
}
```

#### Get Performance Trends
```
GET /api/stats/trends
Authorization: Bearer <token>

Response: 200 OK
{
  "trends": [ ... ]
}
```

### Subscriptions

#### Create Payment
```
POST /api/subscriptions/create-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "plan": "premium"
}

Response: 200 OK
{
  "approvalUrl": "https://paypal.com/...",
  "paymentId": "id"
}
```

#### Execute Payment
```
POST /api/subscriptions/execute-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentId": "id",
  "payerId": "payer_id"
}

Response: 200 OK
```

#### Get Subscription
```
GET /api/subscriptions
Authorization: Bearer <token>

Response: 200 OK
{
  "subscription": { ... }
}
```

#### Cancel Subscription
```
DELETE /api/subscriptions
Authorization: Bearer <token>

Response: 200 OK
```

### AI Services

#### Transcribe Audio
```
POST /api/ai/transcribe
Authorization: Bearer <token>
Content-Type: application/json

{
  "audioBase64": "base64_encoded_audio",
  "language": "en"
}

Response: 200 OK
{
  "text": "Transcribed text..."
}
```

#### Get Next Question
```
POST /api/ai/next-question
Authorization: Bearer <token>
Content-Type: application/json

{
  "interviewHistory": [ ... ],
  "profession": "Software Engineer",
  "language": "en",
  "difficulty": "mid"
}

Response: 200 OK
{
  "question": "...",
  "category": "technical",
  "difficulty": "mid",
  "timeLimit": 300
}
```

#### Evaluate Response
```
POST /api/ai/evaluate-response
Authorization: Bearer <token>
Content-Type: application/json

{
  "question": "What is your experience with React?",
  "response": "I have 5 years of experience...",
  "profession": "Software Engineer",
  "language": "en"
}

Response: 200 OK
{
  "score": 85,
  "strengths": [ ... ],
  "improvements": [ ... ],
  "keywords": [ ... ],
  "feedback": "Great answer..."
}
```

## Error Responses

All errors follow this format:
```json
{
  "message": "Error description",
  "status": 400
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

API endpoints are rate limited to 100 requests per 15 minutes per IP.

Response headers include:
- `X-RateLimit-Limit`: 100
- `X-RateLimit-Remaining`: remaining requests
- `X-RateLimit-Reset`: reset time

## Pagination

List endpoints support pagination (future enhancement):
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
