# Imagen base de MongoDB
FROM mongo:8.2

# Etiquetas de información
LABEL maintainer="tu-email@ejemplo.com"
LABEL description="MongoDB para proyecto de entrevistas IA"

# Variables de entorno (se pueden sobrescribir)
ENV MONGO_INITDB_DATABASE=interviews_db

# Crear directorio para scripts de inicialización
RUN mkdir -p /docker-entrypoint-initdb.d

# Copiar script de inicialización
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Exponer puerto de MongoDB
EXPOSE 27017

# El comando por defecto ya está definido en la imagen base
