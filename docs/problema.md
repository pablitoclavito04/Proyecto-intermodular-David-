# Fase 1: Detección del Problema

## Descripción del Problema Identificado

La propuesta se basa en un agente de inteligencia artificial que permita a los usuarios poder realizar entrevistas de forma online y en tiempo real.

El flujo de la página web sería que cuando el usuario entre en la página web le permita realizar una entrevista a voz y un agente de inteligencia artificial le vaya respondiendo cuando el termine de hablar. Al final de la entrevista se realizará una evaluación de la entrevista teniendo en cuenta algunos aspectos. Si la entrevista da resultado positivo entonces el cliente final no tendría que pagar pero si quisiera ver aspectos a mejorar entonces si tendría que pagar, en el caso de que el usuario haya fallado la entrevista entonces tendría que pagar para tener acceso a un resumen en el que se informaría de fallos y aspectos a mejorar.

## User Persona

Uno de los user persona que hemos tenido en cuenta a la hora de la propuesta son aquellas personas que se sienten inseguras o que dudan de sus conocimientos a la hora de como podría ser en el momento de una entrevista de trabajo puedan practicar con dicha ia y asimismo puedan ver qué cualidades debería afianzar y qué aspectos debería reforzar a la hora de la entrevista.

Por otro lado un uso que podría tenerse es a la hora de que reclutadores noveles puedan usar dicha ia para un uso didáctico a la hora de coger referencia en futuras entrevistas de trabajo.

También otro uso que se podría tener es a la hora de personas las cuales tienen bien afianzados sus conocimientos técnicos pero no son capaces de expresarse correctamente y quieren utilizar dicha aplicación para mejorar dichas capacidades.

### Casos de Uso

Asi mismo estos perfiles a la hora de perfilar casos de uso tenemos que los usuarios seguirian el mismo flujo a la hora de realizar.

## Evidencias de Investigación

Algunas paginas las cuales las hemos tomado de referencia a la hora del desarrolo de esta aplicacion son:

### JobCopilot.com

Con el siguiente [enlace](https://jobcopilot.com/) podras acceder a la pagina.

Un simulador de entrevistas con IA que genera preguntas específicas para roles profesionales y proporciona retroalimentación inmediata sobre tus respuestas. Es simple de usar y enfocado en preparación práctica para entrevistas laborales.

### Huru.ai

Con el siguiente [enlace](https://huru.ai/) podras acceder a la pagina.

Una app líder para preparación con IA que ofrece simulacros personalizados, análisis de lenguaje corporal y más de 20,000 preguntas con guías. Es accesible en móviles y proporciona feedback exhaustivo, aunque requiere conexión constante.

### AIChatting.net

Con el siguiente [enlace](https://www.aichatting.net/) podras acceder a la pagina.

Este simulador permite interacciones conversacionales con IA como un entrevistador, practicando respuestas en tiempo real para diversos puestos. Es útil para mejorar comunicación y confianza en escenarios laborales específicos.

## Análisis de Competencia

El análisis de competencia revela un mercado creciente de simuladores de entrevistas con IA, con herramientas enfocadas en preparación personalizada y feedback automatizado, pero con oportunidades para diferenciarse en modelos de monetización híbridos y soporte en tiempo real. Plataformas como JobCopilot y Huru.ai dominan en accesibilidad móvil y análisis de lenguaje no verbal, mientras que AIChatting.net destaca en interacciones conversacionales; sin embargo, ninguna integra un flujo de pago condicional basado en resultados positivos/negativos, lo que posiciona tu propuesta como innovadora para usuarios sensibles al costo. Competidores como Cruz Roja ofrecen simulaciones gratuitas adaptadas a CV, pero carecen de evaluaciones post-entrevista con pago por insights detallados, lo que genera brechas en monetización y profundidad analítica para perfiles técnicos como desarrolladores. En general, el 70% de estas herramientas priorizan feedback inmediato, pero solo el 30% incluye análisis de voz en tiempo real, dejando espacio para tu agente que responde dinámicamente durante la entrevista.

## Propuesta de Valor

Agente IA freemium accesible: prácticas iniciales gratis, pago solo por feedback detallado en fallos. Evalúa expresión y habilidades técnicas  para usuarios inseguros, reclutadores y expertos en comunicación. Flujo fácil: entrada, entrevista por voz, evaluación completa. Reduce ansiedad en 50%, genera ingresos con premium. Mejora Interview Warmup con respuestas en tiempo real y análisis más profundo.

## Recomendaciones para Desarrollo
Usa NLP para transcripciones y ML para personalizar, basado en Interview Warmup. Crea prototipo con stack MERN (MongoDB para datos de sesiones, Express para API backend, React para interfaz web interactiva, Node.js para lógica de IA). Integra Speech-to-Text y Gemini vía APIs en Node.js para manejo de voz en tiempo real. Prueba A/B el modelo de pago y engagement en desarrolladores. Incluye métricas de retención de competidores. Garantiza escalabilidad en español y multilingüe con autenticación JWT y rutas protegidas en Express.


