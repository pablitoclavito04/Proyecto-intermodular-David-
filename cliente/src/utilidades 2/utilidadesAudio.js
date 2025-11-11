/**
 * Utilidades de Audio
 * Funciones para decodificar y reproducir audio en el navegador
 */

// Contexto de audio global para evitar crear múltiples instancias
let contextoAudio = null;

/**
 * Obtiene o crea el contexto de audio
 * @returns {AudioContext} Contexto de audio
 */
function obtenerContextoAudio() {
    if (!contextoAudio) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        contextoAudio = new AudioContextClass({ sampleRate: 24000 });
    }
    return contextoAudio;
}

/**
 * Decodifica una cadena base64 a un Uint8Array
 * @param {string} base64 - Cadena en base64
 * @returns {Uint8Array} Datos binarios decodificados
 */
function decodificarBase64(base64) {
    const cadenaBinaria = window.atob(base64);
    const longitud = cadenaBinaria.length;
    const bytes = new Uint8Array(longitud);
    
    for (let i = 0; i < longitud; i++) {
        bytes[i] = cadenaBinaria.charCodeAt(i);
    }
    
    return bytes;
}

/**
 * Decodifica audio en base64 a un AudioBuffer
 * @param {string} base64 - Audio en base64 (formato PCM raw)
 * @returns {Promise<AudioBuffer>} Buffer de audio decodificado
 */
export async function decodificarAudio(base64) {
    const contexto = obtenerContextoAudio();
    const datosRaw = decodificarBase64(base64);
    
    // El audio es PCM raw, 16-bit, mono canal
    const datosInt16 = new Int16Array(datosRaw.buffer);
    const cantidadFrames = datosInt16.length;
    const buffer = contexto.createBuffer(1, cantidadFrames, 24000); // 1 canal, 24kHz
    
    const datosCanal = buffer.getChannelData(0);
    for (let i = 0; i < cantidadFrames; i++) {
        // Normalizar a rango [-1.0, 1.0]
        datosCanal[i] = datosInt16[i] / 32768.0;
    }
    
    return buffer;
}

/**
 * Reproduce un AudioBuffer
 * @param {AudioBuffer} buffer - Buffer de audio a reproducir
 * @returns {Promise<void>} Promesa que se resuelve cuando termina la reproducción
 */
export function reproducirAudio(buffer) {
    return new Promise((resolver, rechazar) => {
        try {
            const contexto = obtenerContextoAudio();
            
            // Reanudar el contexto si está suspendido (necesario para algunos navegadores)
            if (contexto.state === 'suspended') {
                contexto.resume();
            }
            
            const fuente = contexto.createBufferSource();
            fuente.buffer = buffer;
            fuente.connect(contexto.destination);
            
            // Resolver la promesa cuando termine la reproducción
            fuente.onended = () => resolver();
            
            fuente.start(0);
        } catch (error) {
            rechazar(error);
        }
    });
}

/**
 * Convierte texto a voz y lo reproduce
 * @param {string} texto - Texto a convertir y reproducir
 * @returns {Promise<void>} Promesa que se resuelve cuando termina la reproducción
 */
export async function hablarTexto(texto) {
    try {
        // Hacer petición al servidor para convertir texto a voz
        const respuesta = await fetch('http://localhost:5000/api/texto-a-voz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texto })
        });
        
        if (!respuesta.ok) {
            throw new Error('Error al obtener el audio del servidor');
        }
        
        const datos = await respuesta.json();
        
        if (!datos.exito || !datos.audio) {
            throw new Error('El servidor no devolvió audio válido');
        }
        
        // Decodificar y reproducir el audio
        const buffer = await decodificarAudio(datos.audio);
        await reproducirAudio(buffer);
        
    } catch (error) {
        console.error('Error al hablar texto:', error);
        throw error;
    }
}

/**
 * Detiene toda la reproducción de audio
 */
export function detenerAudio() {
    if (contextoAudio) {
        contextoAudio.close();
        contextoAudio = null;
    }
}

/**
 * Verifica si el navegador soporta la API de audio
 * @returns {boolean} true si soporta audio
 */
export function soportaAudio() {
    return !!(window.AudioContext || window.webkitAudioContext);
}
