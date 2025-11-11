# 🚀 Servidor Backend PrepáraT

Servidor Node.js con Express que gestiona las peticiones de IA (Gemini) y conversión de audio para la aplicación PrepáraT.

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Una API Key de Google AI (Gemini)

## 🔧 Configuración

### 1. Instalar Dependencias

```bash
cd servidor
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `servidor`:

```bash
# Copia el archivo de ejemplo
cp .env.example .env
```

Edita el archivo `.env` y agrega tu API Key de Google AI:

```env
API_KEY=tu_api_key_de_google_ai_aqui
PORT=5000
```

### 3. Obtener API Key de Google AI

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia la clave y pégala en tu archivo `.env`

## 🚀 Iniciar el Servidor

### Modo Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints Disponibles

### 1. Generar Preguntas

**POST** `/api/generar-preguntas`

Genera preguntas de entrevista basadas en un tema o puesto.

**Body:**
```json
{
  "tema": "Desarrollador Frontend React",
  "cantidad": 5
}
```

**Respuesta:**
```json
{
  "exito": true,
  "preguntas": [
    "¿Qué es React y cuáles son sus principales características?",
    "Explica el concepto de hooks en React",
    "..."
  ],
  "tema": "Desarrollador Frontend React",
  "cantidad": 5
}
```

### 2. Evaluar Entrevista

**POST** `/api/evaluar-entrevista`

Evalúa una entrevista completa basándose en la transcripción.

**Body:**
```json
{
  "transcripcion": [
    {
      "hablante": "IA",
      "texto": "¿Qué es React?"
    },
    {
      "hablante": "Usuario",
      "texto": "React es una biblioteca de JavaScript..."
    }
  ]
}
```

**Respuesta:**
```json
{
  "exito": true,
  "evaluacion": {
    "veredicto": "APROBADO",
    "puntuacionGlobal": 85,
    "resumen": "El candidato demostró...",
    "feedbackDetallado": [...]
  }
}
```

### 3. Texto a Voz

**POST** `/api/texto-a-voz`

Convierte texto en audio usando Gemini TTS.

**Body:**
```json
{
  "texto": "Hola, bienvenido a tu entrevista"
}
```

**Respuesta:**
```json
{
  "exito": true,
  "audio": "base64_encoded_audio_data...",
  "formato": "base64-pcm"
}
```

### 4. Obtener Aclaración

**POST** `/api/obtener-aclaracion`

Obtiene una aclaración durante la entrevista.

**Body:**
```json
{
  "pregunta": "¿Podrías darme un ejemplo?",
  "transcripcion": [...]
}
```

**Respuesta:**
```json
{
  "exito": true,
  "respuesta": "Claro, por ejemplo..."
}
```

## 🧪 Probar el Servidor

Puedes probar los endpoints usando:

### Con curl:

```bash
# Verificar que el servidor está funcionando
curl http://localhost:5000

# Generar preguntas
curl -X POST http://localhost:5000/api/generar-preguntas \
  -H "Content-Type: application/json" \
  -d '{"tema": "Desarrollador Backend Node.js", "cantidad": 5}'
```

### Con Postman o Thunder Client (VS Code):

Importa la colección de endpoints y prueba cada uno.

## 📁 Estructura del Proyecto

```
servidor/
├── index.js                    # Servidor Express principal
├── servicios/
│   └── servicioGemini.js      # Lógica de IA con Gemini
├── package.json               # Dependencias
├── .env                       # Variables de entorno (no incluir en git)
├── .env.example              # Ejemplo de variables
└── README.md                 # Este archivo
```

## 🔒 Seguridad

- **Nunca** subas el archivo `.env` a GitHub
- El archivo `.gitignore` ya incluye `.env`
- Mantén tu API Key privada

## 🐛 Solución de Problemas

### El servidor no inicia

- Verifica que todas las dependencias estén instaladas: `npm install`
- Asegúrate de que el puerto 5000 no esté en uso
- Revisa que tu archivo `.env` esté correctamente configurado

### Error "API_KEY environment variable not set"

- Verifica que creaste el archivo `.env`
- Asegúrate de que tiene la línea `API_KEY=tu_clave_aqui`
- Reinicia el servidor después de crear el archivo

### Error al generar preguntas o evaluaciones

- Verifica tu conexión a internet
- Comprueba que tu API Key es válida
- Revisa los límites de tu cuenta de Google AI

## 📞 Soporte

Si encuentras problemas, revisa:
1. Los logs del servidor en la consola
2. La documentación de [Google AI](https://ai.google.dev/)
3. El estado de la API de Gemini

---

¡Listo! Tu servidor backend está configurado y funcionando. 🎉
