# Backend - Plataforma de Entrevistas IA

API REST construida con Node.js, Express y MongoDB para la plataforma de entrevistas laborales con IA.

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/          # Configuración (DB, etc.)
│   ├── controllers/     # Controladores de rutas
│   ├── models/          # Modelos de Mongoose
│   ├── routes/          # Definición de rutas
│   ├── middlewares/     # Middlewares personalizados
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades y helpers
│   ├── validators/      # Validaciones de datos
│   └── index.js         # Punto de entrada
├── tests/               # Tests
├── .env.example         # Ejemplo de variables de entorno
└── package.json
```

## 🛣️ Rutas de la API

### Autenticación (`/api/auth`)

- `POST /register` - Registrar usuario
- `POST /login` - Iniciar sesión
- `GET /me` - Obtener perfil (protegido)
- `PUT /update-password` - Actualizar contraseña (protegido)

### Usuarios (`/api/users`)

- `GET /` - Obtener todos los usuarios (protegido)
- `GET /:id` - Obtener usuario por ID (protegido)
- `PUT /:id` - Actualizar usuario (protegido)
- `DELETE /:id` - Eliminar usuario (protegido)

### Entrevistas (`/api/interviews`)

- `GET /` - Obtener entrevistas del usuario (protegido)
- `POST /` - Crear nueva entrevista (protegido)
- `GET /:id` - Obtener entrevista por ID (protegido)
- `PUT /:id` - Actualizar entrevista (protegido)
- `DELETE /:id` - Eliminar entrevista (protegido)
- `POST /:id/start` - Iniciar entrevista (protegido)
- `POST /:id/complete` - Completar entrevista (protegido)

### Evaluaciones (`/api/evaluations`)

- `GET /` - Obtener evaluaciones del usuario (protegido)
- `POST /` - Crear evaluación (protegido)
- `GET /:id` - Obtener evaluación por ID (protegido)
- `POST /:id/unlock` - Desbloquear evaluación detallada (protegido)

### Pagos (`/api/payments`)

- `GET /` - Obtener pagos del usuario (protegido)
- `POST /` - Crear pago (protegido)
- `GET /:id` - Obtener pago por ID (protegido)
- `POST /:id/process` - Procesar pago (protegido)

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens) para autenticación. Incluye el token en el header:

```
Authorization: Bearer tu_token_aqui
```

## 📊 Modelos de Datos

### User

- name, email, password
- subscription (free/premium)
- interviewsCompleted
- Métodos: comparePassword(), hasActiveSubscription()

### Interview

- userId, jobTitle, jobDescription
- status (scheduled/in-progress/completed/cancelled)
- transcript, questions, overallScore

### Evaluation

- interviewId, userId
- overallScore, scores (communication, technical, etc.)
- strengths, weaknesses, recommendations
- isPaid, accessLevel (basic/detailed)

### Payment

- userId, interviewId, evaluationId
- amount, currency, paymentMethod
- status, transactionId

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage
```

## 📝 Variables de Entorno

Ver `.env.example` para la lista completa de variables requeridas.

## 🔧 Scripts Disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar con nodemon (desarrollo)
- `npm test` - Ejecutar tests
- `npm run lint` - Verificar código con ESLint
- `npm run lint:fix` - Corregir errores de linting

## 🛡️ Seguridad

- Helmet para headers de seguridad
- Rate limiting para prevenir ataques
- CORS configurado
- Passwords encriptados con bcrypt
- JWT para autenticación stateless

## 📚 Dependencias Principales

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **jsonwebtoken** - Autenticación JWT
- **bcryptjs** - Encriptación de contraseñas
- **helmet** - Seguridad HTTP headers
- **cors** - Manejo de CORS
- **express-rate-limit** - Rate limiting
- **express-validator** - Validación de datos
