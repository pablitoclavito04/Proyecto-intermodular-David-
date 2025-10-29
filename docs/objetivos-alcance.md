# c) objetivos-alcance.md (Criterio 2d)

## Objetivos del proyecto (SMART y especificos).

### Objetivos SMART

- **Específico:** Desarrollar una aplicación web que permita a los usuarios practicar entrevistas respondiendo a preguntas predefinidas y recibir un resultado automático basado en sus respuestas.

- **Medible:** Conseguir que al menos el 90% de los usuarios logren completar correctamente al menos una simulación de entrevista desde el inicio de sesión hasta la obtención del resultado, durante la fase de pruebas iniciales.

- **Alcanzable:** Utilizar tecnologías conocidas (Spring Boot, JavaScript, HTML/CSS) y APIs integrables para asegurar que todas las funcionalidades básicas estén listas en un plazo de 4 semanas desde el inicio del desarrollo.

- **Relevante:** Permitir que estudiantes y personas en búsqueda de empleo practiquen habilidades de entrevista de forma autónoma y rápida, aumentando su confianza y preparación para procesos reales.

- **Temporal:** Lograr el despliegue de la versión MVP funcional, con todos los flujos contemplados, antes del cierre del curso académico (mayo de 2025).

### Objetivos generales y especificos

#### Objetivo general
Desarrollar una aplicación web que permita a los usuarios practicar entrevistas mediante preguntas predefinidas, proporcionando una evaluación automática basada en sus respuestas para mejorar su preparación en procesos reales.

#### Objetivos especificos

- Diseñar un flujo de entrevistas en el que se presenten preguntas predefinidas y se recojan las respuestas del usuario.

- Automatizar la corrección de entrevistas para ofrecer un resultado inmediato (aprobado/no aprobado) al finalizar el proceso.

- Garantizar que el usuario reciba retroalimentación clara y sencilla tras completar la entrevista.

- Validar que el sistema funcione correctamente con usuarios de prueba, asegurando una experiencia sin errores críticos de usabilidad ni de funcionamiento.

## Criterios de éxito.

Se consideran criterios de éxito para validar si el MVP cumple su propósito:

- El usuario puede acceder al sistema y completar el flujo completo de una entrevista.

- La aplicación muestra preguntas predefinidas y recibe las respuestas correctamente.

- El resultado de la entrevista es calculado y mostrado al usuario sin errores.

- El sistema detecta y controla intentos no válidos (ejemplos: acceso sin sesión, respuestas en blanco, etc.).

- El tiempo de respuesta y procesamiento es aceptable, sin esperas mayores de 10 segundos entre etapas clave.

- Al menos el 90% de usuarios de prueba informan que comprendieron el proceso sin ayuda adicional.

## Delimitación del alcance (qué SÍ y qué NO, posibles ampliaciones).

### Incluye (Sí):

- Autenticación básica de usuarios (iniciar sesión).

- Creación de entrevistas con preguntas predefinidas por el sistema.

- Proceso guiado donde el usuario responde a preguntas durante la entrevista.

- Validación automática y entrega de resultado simple (aprobado/no aprobado) al usuario.

- Visualización del resultado al finalizar la entrevista.

- Soporte para entrevistas por voz

- Acceso a corrección detallada, feedback cualitativo o informes personalizados.

### No incluye (No):

- Personalización de preguntas por parte del usuario o administrador.

- Integración con bases de datos externas o sistemas de RRHH reales.

- Soporte para entrevistas por video o multiusuario.

- Integración con redes sociales o notificaciones automáticas externas.


