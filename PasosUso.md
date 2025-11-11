# 🎯 PrepáraT - Integración de IA y Audio

## 📖 Resumen de la Implementación

Se ha extraído y adaptado el código de IA (Gemini) y manejo de audio del proyecto `2-DAW_PI_PruebasPFF-main` y se ha integrado en una arquitectura cliente-servidor completamente en **español**.

## 🏗️ Arquitectura

```
proyecto-intermodular-david/
│
├── cliente/                           # Frontend React
│   └── src/
│       ├── servicios/
│       │   └── servicioAPI.js         # 🆕 Cliente para comunicarse con el backend
│       └── utilidades/
│           └── utilidadesAudio.js     # 🆕 Manejo de audio en el navegador
│
└── servidor/                          # 🆕 Backend Node.js + Express
    ├── index.js                       # Servidor principal con rutas API
    ├── servicios/
    │   └── servicioGemini.js         # Lógica de IA con Gemini
    ├── package.json                   # Dependencias del servidor
    ├── .env.example                   # Ejemplo de configuración
    └── README.md                      # Documentación del servidor
```

## 🔄 Cambios Realizados

### ✅ Código Extraído y Adaptado

1. **De TypeScript a JavaScript**: Todo el código se convirtió de TS a JS
2. **Nombres en Español**: Todas las funciones, variables y comentarios están en español
3. **Arquitectura Cliente-Servidor**: Se separó la lógica en frontend y backend

### 🆕 Nuevo Backend (servidor/)

**Características:**
- ✅ Servidor Express.js
- ✅ API RESTful con 4 endpoints
- ✅ Todo en español (rutas, mensajes, comentarios)
- ✅ Integración completa con Gemini AI
- ✅ CORS habilitado para desarrollo

**Endpoints:**
1. `POST /api/generar-preguntas` - Genera preguntas con IA
2. `POST /api/evaluar-entrevista` - Evalúa entrevistas completas
3. `POST /api/texto-a-voz` - Convierte texto a audio (TTS)
4. `POST /api/obtener-aclaracion` - Obtiene aclaraciones durante entrevistas

### 🆕 Servicios del Cliente (cliente/src/)

**servicioAPI.js:**
- Cliente HTTP para comunicarse con el backend
- Funciones en español que abstraen las peticiones
- Manejo de errores centralizado

**utilidadesAudio.js:**
- Decodificación de audio base64 PCM
- Reproducción de audio en el navegador
- Función `hablarTexto()` que combina TTS + reproducción

## 🚀 Cómo Usar

### 1. Configurar el Servidor

```bash
# Ir a la carpeta del servidor
cd servidor

# Instalar dependencias
npm install

# Crear archivo .env con tu API Key
cp .env.example .env
# Editar .env y agregar: API_KEY=tu_clave_aqui

# Iniciar el servidor
npm run dev
```

El servidor estará en `http://localhost:5000`

### 2. Usar en el Cliente

```javascript
// Ejemplo: Generar preguntas
import { generarPreguntas } from '../servicios/servicioAPI';

const preguntas = await generarPreguntas('Desarrollador Frontend', 5);
console.log(preguntas);
```

```javascript
// Ejemplo: Reproducir texto como audio
import { hablarTexto } from '../utilidades/utilidadesAudio';

await hablarTexto('Bienvenido a tu entrevista');
```

```javascript
// Ejemplo: Evaluar entrevista
import { evaluarEntrevista } from '../servicios/servicioAPI';

const transcripcion = [
  { hablante: 'IA', texto: '¿Qué es React?' },
  { hablante: 'Usuario', texto: 'React es una biblioteca...' }
];

const evaluacion = await evaluarEntrevista(transcripcion);
console.log(evaluacion.veredicto); // 'APROBADO' o 'NO_APROBADO'
console.log(evaluacion.puntuacionGlobal); // 0-100
```

## 🔑 Funcionalidades de IA Disponibles

### 1. Generación de Preguntas
- Genera preguntas personalizadas según el tema/puesto
- Ajustable en cantidad (por defecto 5)
- Diferentes niveles de dificultad

### 2. Evaluación de Entrevistas
- Analiza la transcripción completa
- Proporciona veredicto (APROBADO/NO_APROBADO)
- Puntuación global 0-100
- Feedback detallado por pregunta
- Respuestas ideales de ejemplo

### 3. Texto a Voz (TTS)
- Convierte texto a audio natural
- Voz en español (Kore)
- Audio PCM 24kHz

### 4. Aclaraciones Contextuales
- Responde preguntas del candidato durante la entrevista
- Usa el contexto de la conversación
- Mantiene el flow de la entrevista

## 📦 Dependencias Necesarias

### Servidor
```json
{
  "@google/genai": "^1.28.0",  // SDK de Gemini AI
  "express": "^4.18.2",         // Framework web
  "cors": "^2.8.5",             // CORS para desarrollo
  "dotenv": "^16.3.1"           // Variables de entorno
}
```

### Cliente
No requiere dependencias adicionales (usa fetch nativo y Web Audio API)

## 🔒 Seguridad

- ✅ API Key protegida en variables de entorno
- ✅ `.env` incluido en `.gitignore`
- ✅ Validación de datos en todos los endpoints
- ✅ Manejo de errores robusto

## 📝 Diferencias con el Código Original

| Original (TypeScript) | Nuevo (JavaScript) |
|----------------------|-------------------|
| `generateQuestions()` | `generarPreguntas()` |
| `generateEvaluation()` | `generarEvaluacion()` |
| `textToSpeech()` | `textoAVoz()` |
| `getClarification()` | `obtenerAclaracion()` |
| `Type.STRING` | `Type.STRING` (mismo) |
| Frontend directo | Cliente-Servidor |
| Variables en inglés | Variables en español |

## 🎨 Esquema de Datos

### Transcripción
```javascript
{
  hablante: 'IA' | 'Usuario',
  texto: string
}
```

### Evaluación
```javascript
{
  veredicto: 'APROBADO' | 'NO_APROBADO',
  resumen: string,
  puntuacionGlobal: number, // 0-100
  feedbackDetallado: [
    {
      pregunta: string,
      respuesta: string,
      feedback: string,
      respuestaIdeal: string
    }
  ]
}
```

## 🐛 Testing

Para probar que todo funciona:

```bash
# 1. Inicia el servidor
cd servidor
npm run dev

# 2. En otra terminal, inicia el cliente
cd cliente
npm start

# 3. El cliente debe conectarse automáticamente al servidor en localhost:5000
```

## 📚 Próximos Pasos

Para integrar esto en las páginas:

1. **GenerarConIA.jsx**: Usar `generarPreguntas()` para obtener preguntas
2. **EntrevistaEnCurso.jsx**: Usar `hablarTexto()` para leer preguntas y `obtenerAclaracion()`
3. **Resultados.jsx**: Usar `evaluarEntrevista()` para mostrar la evaluación

## 💡 Notas Importantes

- El servidor debe estar corriendo para que el cliente funcione
- La API Key de Gemini es necesaria para todas las funcionalidades
- El audio funciona mejor en navegadores modernos (Chrome, Edge, Firefox)
- La Web Speech API del navegador se puede usar para Speech-to-Text (reconocimiento de voz)

---

✨ **Todo el sistema está listo para usar con nombres en español y una arquitectura limpia cliente-servidor**
