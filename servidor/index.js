/**
 * Punto de entrada del servidor
 * Carga las variables de entorno antes de iniciar el servidor
 */

import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Verificar que la API_KEY esté configurada
if (!process.env.API_KEY) {
    console.error('❌ Error: La variable de entorno API_KEY no está configurada');
    console.error('📝 Por favor:');
    console.error('   1. Crea un archivo .env en la carpeta servidor/');
    console.error('   2. Agrega la línea: API_KEY=tu_api_key_aqui');
    console.error('   3. Reinicia el servidor');
    process.exit(1);
}

// Ahora importar y ejecutar el servidor
import('./servidor.js').catch(error => {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
});
