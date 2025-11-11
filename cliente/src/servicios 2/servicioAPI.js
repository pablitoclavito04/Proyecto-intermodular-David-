/**
 * Servicio de API para comunicarse con el backend
 * Gestiona todas las peticiones a la API de IA
 */

const URL_BASE_API = 'http://localhost:5000/api';

/**
 * Realiza una petición POST al servidor
 * @param {string} endpoint - Endpoint de la API (sin el prefijo /api)
 * @param {Object} datos - Datos a enviar en el body
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function peticionPost(endpoint, datos) {
    try {
        const respuesta = await fetch(`${URL_BASE_API}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const datosRespuesta = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datosRespuesta.error || 'Error en la petición al servidor');
        }

        return datosRespuesta;
    } catch (error) {
        console.error(`Error en petición a ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Genera preguntas de entrevista para un tema específico
 * @param {string} tema - El tema o puesto para generar preguntas
 * @param {number} cantidad - Cantidad de preguntas a generar (por defecto 5)
 * @returns {Promise<string[]>} Array de preguntas generadas
 */
export async function generarPreguntas(tema, cantidad = 5) {
    try {
        const respuesta = await peticionPost('/generar-preguntas', { tema, cantidad });
        return respuesta.preguntas;
    } catch (error) {
        console.error('Error al generar preguntas:', error);
        throw new Error('No se pudieron generar las preguntas. Por favor, verifica tu conexión e intenta de nuevo.');
    }
}

/**
 * Evalúa una entrevista completa
 * @param {Array<{hablante: 'IA'|'Usuario', texto: string}>} transcripcion - Transcripción de la entrevista
 * @returns {Promise<Object>} Evaluación completa con veredicto, puntuación y feedback
 */
export async function evaluarEntrevista(transcripcion) {
    try {
        const respuesta = await peticionPost('/evaluar-entrevista', { transcripcion });
        return respuesta.evaluacion;
    } catch (error) {
        console.error('Error al evaluar entrevista:', error);
        throw new Error('No se pudo evaluar la entrevista. Por favor, intenta de nuevo.');
    }
}

/**
 * Convierte texto a audio (voz)
 * @param {string} texto - Texto a convertir en voz
 * @returns {Promise<string>} Audio en base64
 */
export async function textoAVoz(texto) {
    try {
        const respuesta = await peticionPost('/texto-a-voz', { texto });
        return respuesta.audio;
    } catch (error) {
        console.error('Error en texto a voz:', error);
        throw new Error('No se pudo generar el audio. Por favor, intenta de nuevo.');
    }
}

/**
 * Obtiene una aclaración durante la entrevista
 * @param {string} pregunta - La pregunta del usuario
 * @param {Array} transcripcion - Contexto de la entrevista
 * @returns {Promise<string>} Respuesta/aclaración de la IA
 */
export async function obtenerAclaracion(pregunta, transcripcion = []) {
    try {
        const respuesta = await peticionPost('/obtener-aclaracion', { pregunta, transcripcion });
        return respuesta.respuesta;
    } catch (error) {
        console.error('Error al obtener aclaración:', error);
        throw new Error('No se pudo obtener una respuesta. Por favor, intenta reformular tu pregunta.');
    }
}

/**
 * Verifica la salud del servidor
 * @returns {Promise<boolean>} true si el servidor está funcionando
 */
export async function verificarServidor() {
    try {
        const respuesta = await fetch('http://localhost:5000/');
        return respuesta.ok;
    } catch (error) {
        console.error('Error al verificar servidor:', error);
        return false;
    }
}
