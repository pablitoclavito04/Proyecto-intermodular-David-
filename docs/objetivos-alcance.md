# c) objetivos-alcance.md (Criterio 2d)

## Objetivos SMART del proyecto.

- **Específico:** Desarrollar una aplicación web que permita a los usuarios practicar entrevistas respondiendo a preguntas predefinidas y recibir un resultado automático basado en sus respuestas.

- **Medible:** Conseguir que al menos el 90% de los usuarios logren completar correctamente al menos una simulación de entrevista desde el inicio de sesión hasta la obtención del resultado, durante la fase de pruebas iniciales.

- **Alcanzable:** Utilizar tecnologías conocidas (Spring Boot, JavaScript, HTML/CSS) y APIs integrables para asegurar que todas las funcionalidades básicas estén listas en un plazo de 4 semanas desde el inicio del desarrollo.

- **Relevante:** Permitir que estudiantes y personas en búsqueda de empleo practiquen habilidades de entrevista de forma autónoma y rápida, aumentando su confianza y preparación para procesos reales.

- **Temporal:** Lograr el despliegue de la versión MVP funcional, con todos los flujos contemplados, antes del cierre del curso académico (mayo de 2025).

## Definición del MVP.
El MVP es el producto minimo viable, es decir, el flujo minimo que seguirá el usuario para completar una tarea, este es el siguiente:

1. Iniciar Sesión
2. Creamos una entrevista con las preguntas predefinidas
3. Le pasamos las preguntas predefinidas
4. Usuario se queda en la pantalla de carga
5. Empezamos la entrevista (Responde a las preguntas de la entrevista)
6. Realizamos la entrevista (Respondió a las preguntas de la entrevista)
7. El Usuario entra en la pantalla de carga
8. Recibimos el resultado de la entrevista (en este caso se ha aprobado)
9. salimos de los resultados de la entrevista


## Delimitación del alcance (qué SÍ y qué NO).

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


## Criterios de éxito.

Se consideran criterios de éxito para validar si el MVP cumple su propósito:

- El usuario puede acceder al sistema y completar el flujo completo de una entrevista.

- La aplicación muestra preguntas predefinidas y recibe las respuestas correctamente.

- El resultado de la entrevista es calculado y mostrado al usuario sin errores.

- El sistema detecta y controla intentos no válidos (ejemplos: acceso sin sesión, respuestas en blanco, etc.).

- El tiempo de respuesta y procesamiento es aceptable, sin esperas mayores de 10 segundos entre etapas clave.

- Al menos el 90% de usuarios de prueba informan que comprendieron el proceso sin ayuda adicional.