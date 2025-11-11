/**
 * Servicio de IA de Gemini
 * Gestiona la generación de preguntas, evaluaciones, conversión de texto a voz y aclaraciones
 */

import { GoogleGenAI, Type, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("La variable de entorno API_KEY no está configurada");
}

const ia = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Genera preguntas de entrevista basadas en un tema/puesto
 * @param {string} tema - El puesto o tema para el cual generar preguntas
 * @param {number} cantidad - Cantidad de preguntas a generar (por defecto 5)
 * @returns {Promise<string[]>} Array de preguntas generadas
 */
export async function generarPreguntas(tema, cantidad = 5) {
    try {
        const respuesta = await ia.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Genera ${cantidad} preguntas de entrevista en español para un puesto de ${tema}. Las preguntas deben cubrir un rango de dificultades (básicas, intermedias y avanzadas) y ser relevantes para el puesto.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        preguntas: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        }
                    }
                }
            }
        });

        const textoJson = respuesta.text.trim();
        const resultado = JSON.parse(textoJson);
        return resultado.preguntas || [];
    } catch (error) {
        console.error("Error al generar preguntas:", error);
        throw new Error("No se pudieron generar las preguntas de la entrevista. El modelo puede no estar disponible o el tema es demasiado específico.");
    }
}

/**
 * Genera una evaluación completa de la entrevista basada en la transcripción
 * @param {Array} transcripcion - Array de objetos con la transcripción de la entrevista
 * @returns {Promise<Object>} Objeto con la evaluación completa
 */
export async function generarEvaluacion(transcripcion) {
    const transcripcionFormateada = transcripcion
        .map(entrada => `${entrada.hablante === 'IA' ? 'Entrevistador' : 'Candidato'}: ${entrada.texto}`)
        .join('\n');

    try {
        const respuesta = await ia.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `Como un experto manager de RRHH y entrevistador técnico, evalúa la siguiente transcripción de entrevista. 
            
Proporciona:
1. Un veredicto final (APROBADO/NO_APROBADO)
2. Una puntuación global de 0 a 100
3. Un resumen general del desempeño
4. Análisis detallado de cada pregunta y respuesta

La transcripción de la entrevista es:

${transcripcionFormateada}`,
            config: {
                systemInstruction: "Eres un experto evaluador de entrevistas de trabajo. Debes proporcionar una respuesta JSON siguiendo el esquema especificado. El veredicto debe ser 'APROBADO' o 'NO_APROBADO'. El resumen debe ser una visión general concisa en español de máximo 200 palabras. La puntuación global debe ser un número entre 0 y 100. El feedback detallado debe ser un array de objetos, cada uno conteniendo la pregunta, la respuesta del usuario, tu feedback específico y un ejemplo de respuesta ideal. Todo el contenido debe estar en español.",
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        veredicto: { 
                            type: Type.STRING, 
                            enum: ['APROBADO', 'NO_APROBADO'] 
                        },
                        resumen: { 
                            type: Type.STRING 
                        },
                        puntuacionGlobal: { 
                            type: Type.NUMBER 
                        },
                        feedbackDetallado: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    pregunta: { type: Type.STRING },
                                    respuesta: { type: Type.STRING },
                                    feedback: { type: Type.STRING },
                                    respuestaIdeal: { type: Type.STRING }
                                },
                                required: ['pregunta', 'respuesta', 'feedback', 'respuestaIdeal']
                            }
                        }
                    },
                    required: ['veredicto', 'resumen', 'puntuacionGlobal', 'feedbackDetallado']
                }
            }
        });

        const textoJson = respuesta.text.trim();
        return JSON.parse(textoJson);
    } catch (error) {
        console.error("Error al generar evaluación:", error);
        throw new Error("No se pudo evaluar la entrevista. El modelo puede haber devuelto un formato inesperado.");
    }
}

/**
 * Convierte texto a voz usando Gemini TTS
 * @param {string} texto - El texto a convertir en audio
 * @returns {Promise<string>} Audio en base64
 */
export async function textoAVoz(texto) {
    try {
        const respuesta = await ia.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: texto }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // Voz que soporta español
                    },
                },
            },
        });
        
        const audioBase64 = respuesta.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!audioBase64) {
            throw new Error("No se recibieron datos de audio de la API TTS.");
        }
        return audioBase64;
    } catch (error) {
        console.error("Error en conversión texto a voz:", error);
        throw new Error("No se pudo generar el audio para el texto proporcionado.");
    }
}

/**
 * Obtiene una aclaración o respuesta a una pregunta del usuario durante la entrevista
 * @param {string} pregunta - La pregunta del usuario
 * @param {Array} transcripcion - El contexto de la entrevista hasta el momento
 * @returns {Promise<string>} La respuesta o aclaración
 */
export async function obtenerAclaracion(pregunta, transcripcion) {
    try {
        const transcripcionFormateada = transcripcion
            .map(entrada => `${entrada.hablante === 'IA' ? 'Entrevistador' : 'Candidato'}: ${entrada.texto}`)
            .join('\n');
        
        const respuesta = await ia.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Eres un entrevistador profesional. El candidato está en una entrevista y ha preguntado: '${pregunta}'. 

El contexto de la entrevista hasta ahora es:

${transcripcionFormateada}

Proporciona una aclaración o respuesta breve y útil a la pregunta del candidato en español (máximo 100 palabras), manteniendo un tono profesional y amigable. Luego anímale brevemente a continuar con su respuesta a la pregunta original de la entrevista.`,
        });
        
        return respuesta.text;
    } catch (error) {
        console.error("Error al obtener aclaración:", error);
        throw new Error("Lo siento, no pude procesar esa pregunta en este momento. Por favor, intenta reformularla.");
    }
}
