# Análisis de requisitos funcionales:

## Listad las funcionalidades principales.

- Permitir que el usuario pueda hablar y que obtenga una respuesta en función a esa conversación.
- El programa debería darle una retroalimentación al usuario de los errores que ha cometido.
- El programa debería tener una lógica que permita saber al agente de inteligencia artificial saber cuando se debería tener.
- El pograma podría tener una opción para activar un retrato facial imitando el comportamiento humano para que el usuario pueda ponerse en situación más facilmente.

## Priorizadlas usando el método MoSCoW (Must have, Should have, Could have, Won't have).

#### Debe tener
- El programa debe tener una opción que permita al usuario hablar y obtener una respuesta en función a esa conversación.
- El programa debe dar una retroalimentación al usuario de los errores que ha cometido.

### Debería tener
- El programa podría tener una lógica que permita saber al agente de inteligencia artificial saber cuando se debería detener la conversación.

### Podría tener
- El pograma podría tener una opción para activar un retrato facial imitando el comportamiento humano para que el usuario pueda ponerse en situación más facilmente.


## Definid el MVP (Producto Mínimo Viable).
El producto mínimo viable de nuestra aplicación sería permitir que el usuario pudiera realizar pruebas de entrevistas de trabajo por medio oral y que el programa pudiera recopilar esa información dada por la conversación del usuario y mediante  agentes de inteligencia ártificial. La forma de mostrar los resultados podrían ser mediante texto o voz pero de momento podría ser texto ya que lo importante es que el usuario se pueda comunicar con la voz. El punto clave es que el programa debería ser capaz de comunicarse con el usuario por medio de preguntas y que el usuario pueda responderle por medio de voz y recopilando todo lo que dice incluso las muletillas que tenga mientras habla incluso el tiempo que tarda pensando, ya que el objetivo es ser críticos igual que pasaría en una entrevista de trabajo.




## Análisis de requisitos técnicos:

### Frontend (React): ¿Qué bibliotecas adicionales necesitaréis? (routing, state management, UI components, etc.)

- **react-media-recorder** Usada para la grabación de audios 
- **axios** Usada para conectar el frontend con el backend
- **Material-UI** Usada para usar componentes predefinidos para facilitarnos el trabajo ya que tenemos poco tiempo.
- **react-router-dom** Usada para permitir que la página web pueda simular varías páginas y deje de ser una SPA.

### Backend (Node.js + Express): ¿Qué APIs o servicios externos integraréis? ¿Necesitáis autenticación? ¿Qué tipo?

#### Servicios:
- **Deepgram** Usada en node para permitir transcribir los audios y además detectar las muletillas
- **Replicate** Usada para realizar llamadas a modelos de inteligencia artificial.


### Base de datos (MongoDB): Diseñad un esquema preliminar de las colecciones principales



# TODO


Infraestructura: ¿Dónde desplegaréis? (VPS, Vercel, Render, Railway, etc.) ¿Necesitáis servicios cloud?
Evaluación de capacidades del equipo:

Haced un inventario de habilidades: ¿Quién tiene experiencia en qué?
Identificad lagunas de conocimiento: ¿Qué necesitaréis aprender?
Valorad si es realista completar el proyecto en el tiempo disponible.
Identificación de riesgos técnicos:

Listad al menos 5 riesgos potenciales (técnicos, de tiempo, de recursos).
Proponed estrategias de mitigación para cada riesgo.
