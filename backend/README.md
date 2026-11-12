# Task Manager - Backend

Backend API REST para el gestor de tareas, construido con Node.js, Express, TypeScript y Prisma ORM conectado a PostgreSQL.

## 🚀 Tecnologías

- **Node.js** 20.x
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos (Neon en producción)

## 📋 Requisitos previos

- Node.js 20.x o superior
- npm o yarn
- Cuenta en [Neon](https://neon.tech) para la base de datos PostgreSQL

## 🛠️ Instalación local

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
```bash
cp .env.example .env
```

Edita el archivo `.env` y configura tu `DATABASE_URL` de Neon:
```env
DATABASE_URL="postgresql://usuario:password@host.neon.tech/neondb?sslmode=require"
PORT=3001
FRONTEND_URL="http://localhost:5173"
```

3. **Generar el cliente Prisma y crear la base de datos**:
```bash
# Opción 1: Crear migración (recomendado)
npm run prisma:migrate

# Opción 2: Push directo del esquema
npm run prisma:push
```

4. **Iniciar el servidor en modo desarrollo**:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`.

## 📡 Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas |
| POST | `/api/tasks` | Crear una nueva tarea |
| PUT | `/api/tasks/:id` | Actualizar una tarea |
| DELETE | `/api/tasks/:id` | Eliminar una tarea |
| GET | `/health` | Health check del servidor |

### Ejemplos de uso

**Crear tarea**:
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi primera tarea"}'
```

**Actualizar tarea**:
```bash
curl -X PUT http://localhost:3001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Eliminar tarea**:
```bash
curl -X DELETE http://localhost:3001/api/tasks/1
```

## 🐳 Docker

Para construir la imagen Docker:
```bash
docker build -t task-manager-backend .
```

Para ejecutar el contenedor:
```bash
docker run -p 3001:3001 \
  -e DATABASE_URL="tu_database_url" \
  -e FRONTEND_URL="http://localhost:5173" \
  task-manager-backend
```

## 🌐 Despliegue en Render

1. **Sube el código a GitHub** (si aún no lo has hecho).

2. **Crea una cuenta en [Render](https://render.com)** (puedes usar GitHub para login).

3. **Crea un nuevo Web Service**:
   - Haz clic en **"New +"** → **"Web Service"**
   - Conecta tu repositorio de GitHub
   - Configura los siguientes campos:
     - **Name**: `task-manager-backend`
     - **Region**: Elige la más cercana (ej. Oregon)
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Environment**: `Docker`
     - **Instance Type**: `Free`

4. **Configura las variables de entorno**:
   - `DATABASE_URL`: Tu URL de conexión de Neon
   - `PORT`: `3001`
   - `FRONTEND_URL`: URL de tu frontend en Vercel (la obtendrás después)
   - `NODE_ENV`: `production`

5. **Despliega** haciendo clic en **"Create Web Service"**. El deploy tardará 2-5 minutos.

6. **Copia la URL pública** que te asigna Render (ej. `https://task-manager-backend-xxx.onrender.com`).

7. **Nota**: Render ejecutará automáticamente `prisma generate` gracias al script `postinstall` en el Dockerfile.

## 🔧 Scripts disponibles

```bash
npm run dev          # Modo desarrollo con hot-reload
npm run build        # Compilar TypeScript a JavaScript
npm start            # Ejecutar servidor en producción
npm run prisma:migrate  # Crear y aplicar migraciones
npm run prisma:push     # Push del esquema sin migración
npm run prisma:studio   # Abrir Prisma Studio (GUI para la DB)
```

## 📂 Estructura del proyecto

```
backend/
├── src/
│   ├── index.ts              # Punto de entrada
│   ├── routes/
│   │   └── tasks.ts          # Rutas de la API
│   ├── controllers/
│   │   └── taskController.ts # Lógica de negocio
│   ├── lib/
│   │   └── prisma.ts         # Cliente Prisma singleton
│   └── prisma/
│       └── schema.prisma     # Modelo de datos
├── package.json
├── tsconfig.json
├── Dockerfile
└── .env.example
```

## 🔐 Seguridad

- CORS configurado para permitir solo el origen del frontend
- Variables de entorno para datos sensibles
- Validación de datos en los endpoints
- Manejo de errores con códigos HTTP apropiados

## 📝 Notas

- El servidor usa `scale-to-zero` en Render (se apaga después de 15 minutos sin tráfico)
- La primera petición después de inactividad puede tardar 30-50 segundos (cold start)
- Neon free tier incluye 0.5 GB de almacenamiento y 10 GB de transferencia mensual
- Render free tier incluye 512 MB RAM y 750 horas de servicio al mes
