/**
 * Servidor Backend de PrepáraT
 * Gestiona las peticiones de IA y audio y gestion de autenticación
 */

import express from 'express';
import cors from 'cors';
import { 
    generarPreguntas, 
    generarEvaluacion, 
    textoAVoz, 
    obtenerAclaracion 
} from './servicios/servicioGemini.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = express();
const PUERTO = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'clave_temporal_desarrollo_cambiar_en_produccion_2025';

// Conexión a MongoDB (temporal - esperar a que Alejandro lo configure)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/preparatt';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.warn('⚠️ MongoDB aún no disponible (esperando configuración de Alejandro):', err.message));

// Esquema de Usuario (modelo temporal)
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now },
    ultimoAcceso: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Aumentar límite para audio base64

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        mensaje: '🎯 Servidor PrepáraT - API de IA funcionando correctamente',
        version: '1.0.0'
    });
});

/* ------------------------------------------------------------------- */
/* ------------------------------------------------------------------- */

/* ------------AUTENTIFICACION LOGIN REGISTER Y MIDDLEWARE------------ */

/* ------------------------------------------------------------------- */
/* ------------------------------------------------------------------- */

/**
POST /api/auth/register
- Body: { email, password, nombre }
- Respuesta: { token, usuario }
- Qué hace: Crea un nuevo usuario en la BD
 */

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, nombre } = req.body;

        // 1. Validar que los campos no estén vacíos
        if (!email || !password || !nombre) {
            return res.status(400).json({ 
                error: 'Email, contraseña y nombre son obligatorios' 
            });
        }

        // 2. Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'El email no tiene un formato válido' 
            });
        }

        // 3. Validar longitud de contraseña
        if (password.length < 6) {
            return res.status(400).json({ 
                error: 'La contraseña debe tener al menos 6 caracteres' 
            });
        }

        // 4. COMENTADO TEMPORALMENTE - Verificar si el usuario ya existe
        // const usuarioExistente = await Usuario.findOne({ email: email.toLowerCase() });
        // if (usuarioExistente) {
        //     return res.status(409).json({ 
        //         error: 'El email ya está registrado' 
        //     });
        // }

        // 5. Hashear la contraseña (bcryptjs)
        const saltRounds = 10;
        const passwordHasheada = await bcryptjs.hash(password, saltRounds);

        // 6. Crear nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre: nombre.trim(),
            email: email.toLowerCase(),
            password: passwordHasheada
        });

        // 7. COMENTADO TEMPORALMENTE - Guardar en la base de datos
        // await nuevoUsuario.save();

        // 8. Generar token JWT (funciona sin BD)
        const token = jwt.sign(
            { 
                id: nuevoUsuario._id || 'temp-id-' + Date.now(),
                email: nuevoUsuario.email 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 9. Responder al cliente
        console.log(`✅ Nuevo usuario registrado (sin BD): ${email}`);
        res.status(201).json({ 
            exito: true,
            mensaje: 'Usuario registrado correctamente',
            token,
            usuario: {
                id: nuevoUsuario._id || 'temp-id-' + Date.now(),
                email: nuevoUsuario.email,
                nombre: nuevoUsuario.nombre
            }
        });

    } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        res.status(500).json({ 
            error: 'Error al registrar usuario',
            detalle: error.message 
        });
    }
});


/**
POST /api/auth/login
- Body: { email, password }
- Respuesta: { token, usuario }
- Qué hace: Valida credenciales y devuelve token JWT
 */

app.post('/api/auth/login', async (req, res) => {
    // Lógica de registro de usuario aquí
    res.json({ mensaje: 'Login de usuario no implementado aún' });
});

/**
POST /api/auth/refresh-token
- Body: { refreshToken }
- Respuesta: { token }
- Qué hace: Genera nuevo token sin credenciales
 */

app.post('/api/auth/refresh-token', async (req, res) => {
    // Lógica de refresh token aquí
    res.json({ mensaje: 'Refresh token no implementado aún' });
});

/**
Middleware verifyToken
- Verifica que el token JWT sea válido
- Se aplica a rutas protegidas
- Si no es válido: error 401
 */
const verifyToken = (req, res, next) => {
    // Lógica de verificación de token aquí
    next();
};



/* FLUJO DE PROCESO DE AUTENTIFICACIÓN

1. Usuario se registra
   ↓
   Backend: hashea password (bcrypt)
   Backend: guarda en MongoDB
   Backend: genera JWT token
   ↓
   Frontend: recibe token y lo guarda (localStorage)

2. Usuario hace login
   ↓
   Backend: verifica email/password
   Backend: genera JWT token
   ↓
   Frontend: recibe token

3. Usuario hace petición a ruta protegida
   ↓
   Frontend: envía token en header (Authorization: Bearer <token>)
   Backend: middleware verifica token
   Si válido: continúa
   Si inválido: error 401


----------- ESTRUCTURA DE ARCHIVOS NECESARIA -----------


servidor/
├── servidor.js (archivo actual)
├── servicios/
│   ├── servicioGemini.js (ya existe)
│   └── servicioAuth.js (NUEVO)
├── middleware/
│   └── verificarToken.js (NUEVO)
├── modelos/
│   └── Usuario.js (NUEVO - modelo Mongoose)
└── rutas/
    ├── auth.js (NUEVO)
    └── entrevistas.js (NUEVO - para organizar mejor)


---------- DEPENDENCIA A INSTALAR ----------
npm install jsonwebtoken bcryptjs mongoose dotenv



---------- EJEMPLO DE LLAMADA DESDE FRONTEND ----------

// Registro
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@example.com',
    password: '12345678',
    nombre: 'Juan'
  })
})

// Login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'usuario@example.com',
    password: '12345678'
  })
})

// Ruta protegida (después de login)
fetch('http://localhost:5000/api/generar-preguntas', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...' // token recibido
  },
  body: JSON.stringify({ tema: 'JavaScript' })
})

*/



/* -------------------------------------------- */
/* -------------------------------------------- */

/* -------------------------------------------- */
/* -------------------------------------------- */

/* -------------------------------------------- */
/* -------------------------------------------- */




/**
 * POST /api/generar-preguntas
 * Genera preguntas de entrevista basadas en un tema
 * Body: { tema: string, cantidad?: number }
 */
app.post('/api/generar-preguntas', async (req, res) => {
    try {
        const { tema, cantidad = 5 } = req.body;

        if (!tema || tema.trim() === '') {
            return res.status(400).json({ 
                error: 'El tema es obligatorio' 
            });
        }

        console.log(`📝 Generando ${cantidad} preguntas para: ${tema}`);
        const preguntas = await generarPreguntas(tema, cantidad);

        res.json({ 
            exito: true,
            preguntas,
            tema,
            cantidad: preguntas.length
        });
    } catch (error) {
        console.error('❌ Error al generar preguntas:', error);
        res.status(500).json({ 
            error: error.message || 'Error al generar las preguntas' 
        });
    }
});

/**
 * POST /api/evaluar-entrevista
 * Evalúa una entrevista completa
 * Body: { transcripcion: Array<{hablante: 'IA'|'Usuario', texto: string}> }
 */
app.post('/api/evaluar-entrevista', async (req, res) => {
    try {
        const { transcripcion } = req.body;

        if (!transcripcion || !Array.isArray(transcripcion) || transcripcion.length === 0) {
            return res.status(400).json({ 
                error: 'La transcripción es obligatoria y debe ser un array no vacío' 
            });
        }

        console.log(`📊 Evaluando entrevista con ${transcripcion.length} entradas`);
        const evaluacion = await generarEvaluacion(transcripcion);

        res.json({ 
            exito: true,
            evaluacion
        });
    } catch (error) {
        console.error('❌ Error al evaluar entrevista:', error);
        res.status(500).json({ 
            error: error.message || 'Error al evaluar la entrevista' 
        });
    }
});

/**
 * POST /api/texto-a-voz
 * Convierte texto a voz
 * Body: { texto: string }
 */
app.post('/api/texto-a-voz', async (req, res) => {
    try {
        const { texto } = req.body;

        if (!texto || texto.trim() === '') {
            return res.status(400).json({ 
                error: 'El texto es obligatorio' 
            });
        }

        console.log(`🔊 Convirtiendo texto a voz: "${texto.substring(0, 50)}..."`);
        const audioBase64 = await textoAVoz(texto);

        res.json({ 
            exito: true,
            audio: audioBase64,
            formato: 'base64-pcm'
        });
    } catch (error) {
        console.error('❌ Error en texto a voz:', error);
        res.status(500).json({ 
            error: error.message || 'Error al convertir texto a voz' 
        });
    }
});

/**
 * POST /api/obtener-aclaracion
 * Obtiene una aclaración durante la entrevista
 * Body: { pregunta: string, transcripcion: Array }
 */
app.post('/api/obtener-aclaracion', async (req, res) => {
    try {
        const { pregunta, transcripcion = [] } = req.body;

        if (!pregunta || pregunta.trim() === '') {
            return res.status(400).json({ 
                error: 'La pregunta es obligatoria' 
            });
        }

        console.log(`💬 Obteniendo aclaración para: "${pregunta}"`);
        const respuesta = await obtenerAclaracion(pregunta, transcripcion);

        res.json({ 
            exito: true,
            respuesta
        });
    } catch (error) {
        console.error('❌ Error al obtener aclaración:', error);
        res.status(500).json({ 
            error: error.message || 'Error al obtener aclaración' 
        });
    }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        rutaDisponibles: [
            '/api/auth/register',
            'POST /api/generar-preguntas',
            'POST /api/evaluar-entrevista',
            'POST /api/texto-a-voz',
            'POST /api/obtener-aclaracion'
        ]
    });
});

// Manejo de errores global
app.use((error, req, res, next) => {
    console.error('❌ Error no controlado:', error);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        mensaje: error.message 
    });
});

// Iniciar servidor
app.listen(PUERTO, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Servidor PrepáraT Iniciado          ║
║                                          ║
║   📍 Puerto: ${PUERTO}                        ║
║   🌐 URL: http://localhost:${PUERTO}         ║
║                                          ║
║   ✅ Rutas disponibles:                  ║
║   • POST /api/auth/register              ║
║   • POST /api/generar-preguntas          ║
║   • POST /api/evaluar-entrevista         ║
║   • POST /api/texto-a-voz                ║
║   • POST /api/obtener-aclaracion         ║
╚═══════════════════════════════════════════╝
    `);
});

export default app;
