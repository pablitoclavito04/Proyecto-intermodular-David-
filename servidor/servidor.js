/**
 * Servidor Backend de PrepáraT
 * Gestiona las peticiones de IA y audio
 */

import express from 'express';
import cors from 'cors';
import { 
    generarPreguntas, 
    generarEvaluacion, 
    textoAVoz, 
    obtenerAclaracion 
} from './servicios/servicioGemini.js';

const app = express();
const PUERTO = process.env.PORT || 5000;

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
║   • POST /api/generar-preguntas          ║
║   • POST /api/evaluar-entrevista         ║
║   • POST /api/texto-a-voz                ║
║   • POST /api/obtener-aclaracion         ║
╚═══════════════════════════════════════════╝
    `);
});

export default app;
