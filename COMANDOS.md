# 🚀 Guía Rápida de Comandos NPM

## ⚡ Inicio Rápido (RECOMENDADO)

```bash
# 1. Instalar todo
npm run install:all

# 2. Configurar API Key del servidor
cd servidor
cp .env.example .env
# Editar .env y poner tu API_KEY

# 3. Volver a la raíz
cd ..

# 4. Iniciar todo (cliente + servidor)
npm run dev
```

## 📋 Lista Completa de Comandos

### 🔧 Instalación

| Comando | Descripción |
|---------|-------------|
| `npm run install:all` | Instala dependencias del cliente Y servidor |
| `npm run install:cliente` | Solo instala dependencias del cliente |
| `npm run install:servidor` | Solo instala dependencias del servidor |

### 🚀 Desarrollo

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | ⭐ Inicia cliente + servidor simultáneamente |
| `npm run dev:cliente` | Inicia solo el cliente React (puerto 3000) |
| `npm run dev:servidor` | Inicia solo el servidor backend (puerto 5000) |

### 📦 Producción

| Comando | Descripción |
|---------|-------------|
| `npm run build:cliente` | Construye el cliente para producción |
| `npm run start:cliente` | Inicia el cliente en modo producción |
| `npm run start:servidor` | Inicia el servidor en modo producción |

### 🧪 Testing

| Comando | Descripción |
|---------|-------------|
| `npm run test:cliente` | Ejecuta los tests del cliente |

## 🌐 URLs de Acceso

Después de ejecutar `npm run dev`:

- **Frontend (Cliente)**: http://localhost:3000
- **Backend (API)**: http://localhost:5000
- **API Health Check**: http://localhost:5000/

## 💡 Consejos

### ✅ Para desarrollo normal:
```bash
npm run dev
```
Este comando inicia automáticamente tanto el cliente como el servidor en terminales separadas.

### ✅ Si ya tienes dependencias instaladas:
```bash
npm run dev
```
No necesitas volver a instalar si ya lo hiciste antes.

### ✅ Si actualizas el código:
```bash
# No necesitas reiniciar nada, ambos se recargan automáticamente:
# - Cliente React: recarga automática (Hot Reload)
# - Servidor: debes reiniciar manualmente (Ctrl+C y npm run dev)
```

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```bash
npm run install:all
```

### El servidor no inicia
```bash
# Verifica que el archivo .env existe en la carpeta servidor
cd servidor
ls .env  # o dir .env en Windows

# Si no existe, créalo
cp .env.example .env
# Luego edita .env y agrega tu API_KEY
```

### El puerto 3000 o 5000 ya está en uso
```bash
# Windows PowerShell - Ver qué está usando el puerto
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Matar el proceso (reemplaza PID con el número que aparece)
Stop-Process -Id PID -Force
```

### El cliente no se conecta al servidor
1. Verifica que el servidor esté corriendo (puerto 5000)
2. Revisa la consola del navegador para errores de CORS
3. Asegúrate de que ambos están corriendo simultáneamente

## 📝 Notas

- **Cliente React**: Se recarga automáticamente cuando guardas cambios
- **Servidor Express**: Necesitas reiniciarlo manualmente para ver cambios
- **Concurrently**: Permite ejecutar ambos con un solo comando
- **API Key**: Es obligatoria para que el servidor funcione correctamente

## 🎯 Flujo de Trabajo Típico

```bash
# Al comenzar el día
cd proyecto-intermodular-david
npm run dev

# Desarrollar normalmente, los cambios se reflejan automáticamente

# Al terminar
Ctrl + C  # En la terminal para detener ambos servicios
```

---

¿Necesitas ayuda? Revisa:
- [README.md](./README.md) - Documentación principal
- [INTEGRACION_IA.md](./INTEGRACION_IA.md) - Guía de IA
- [servidor/README.md](./servidor/README.md) - Documentación del servidor
