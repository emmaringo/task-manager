# 📝 Task Manager - Proyecto Full-Stack

Aplicación completa de gestión de tareas construida con **React**, **Node.js**, **Express**, **TypeScript** y **PostgreSQL**. Diseñada para ser desplegada **completamente gratis** en servicios cloud.

![Stack](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?style=flat-square&logo=react)
![Stack](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=flat-square&logo=node.js)
![Stack](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Prisma-4169e1?style=flat-square&logo=postgresql)
![Stack](https://img.shields.io/badge/TypeScript-100%25-3178c6?style=flat-square&logo=typescript)

## 🎯 Características

- ✅ CRUD completo de tareas (crear, leer, actualizar, eliminar)
- ✅ Marcar tareas como completadas
- ✅ Interfaz moderna y responsive
- ✅ Dark mode automático
- ✅ API REST bien estructurada
- ✅ TypeScript en frontend y backend
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ 100% gratuito para desplegar

## 🏗️ Arquitectura

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│   Frontend      │─────▶│   Backend       │─────▶│   PostgreSQL    │
│   (Vercel)      │      │   (Koyeb)       │      │   (Neon)        │
│   React + Vite  │      │   Express + TS  │      │   Prisma ORM    │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## 🚀 Stack tecnológico

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool ultra-rápido
- **TypeScript** - Tipado estático
- **CSS puro** - Sin frameworks, diseño limpio

### Backend
- **Node.js 20** - Runtime de JavaScript
- **Express** - Framework web minimalista
- **TypeScript** - Type safety
- **Prisma** - ORM moderno para PostgreSQL

### Base de datos
- **PostgreSQL** - Base de datos relacional
- **Neon** - Hosting serverless gratuito

### Despliegue (todo gratuito)
- **Frontend**: Vercel (free tier, CDN global)
- **Backend**: Koyeb (512 MB RAM, scale-to-zero)
- **Base de datos**: Neon (0.5 GB storage, 10 GB bandwidth)
- **Dominio**: DNS.HE o similares (subdominio gratuito)

## 📦 Estructura del proyecto

```
task-manager/
├── backend/                 # API REST con Express
│   ├── src/
│   │   ├── index.ts         # Entry point del servidor
│   │   ├── routes/
│   │   │   └── tasks.ts     # Rutas CRUD
│   │   ├── controllers/
│   │   │   └── taskController.ts
│   │   └── lib/
│   │       └── prisma.ts    # Cliente Prisma
│   ├── prisma/
│   │   └── schema.prisma    # Modelo de datos
│   ├── Dockerfile           # Para Koyeb
│   ├── package.json
│   └── README.md
│
├── frontend/                # SPA con React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── api/             # Cliente HTTP
│   │   ├── types/           # Tipos TypeScript
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── README.md
│
└── README.md               # Este archivo
```

## 🛠️ Instalación y ejecución local

### Prerrequisitos

- Node.js 20.x o superior
- npm o yarn
- Cuenta en Neon (gratis) para la base de datos

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd task-manager
```

### 2. Configurar la base de datos

1. Crea una cuenta en [Neon](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia la cadena de conexión (Connection String)

### 3. Configurar el Backend

```bash
cd backend
npm install

# Copiar variables de entorno
cp .env.example .env
```

Edita `backend/.env` y configura:
```env
DATABASE_URL="postgresql://usuario:password@host.neon.tech/neondb?sslmode=require"
PORT=3001
FRONTEND_URL="http://localhost:5173"
```

Ejecutar migraciones:
```bash
npm run prisma:push
```

Iniciar servidor:
```bash
npm run dev
```

El backend estará en `http://localhost:3001`

### 4. Configurar el Frontend

```bash
cd ../frontend
npm install

# Copiar variables de entorno
cp .env.example .env
```

Edita `frontend/.env`:
```env
VITE_API_URL="http://localhost:3001/api"
```

Iniciar aplicación:
```bash
npm run dev
```

El frontend estará en `http://localhost:5173`

### 5. Probar la aplicación

Abre tu navegador en `http://localhost:5173` y deberías ver la aplicación funcionando.

## 🌐 Despliegue en producción (100% gratis)

### Paso 1: Base de datos en Neon

1. Ve a [Neon](https://neon.tech) y crea una cuenta
2. Crea un nuevo proyecto PostgreSQL
3. Copia la **Connection String** (la necesitarás para el backend)
4. ¡Listo! Neon se encarga del resto

### Paso 2: Backend en Koyeb

1. Sube tu código a GitHub (si no lo has hecho)

2. Ve a [Koyeb](https://app.koyeb.com) y crea una cuenta

3. Crea un nuevo servicio:
   - **Source**: GitHub
   - **Repository**: tu repositorio
   - **Branch**: main
   - **Builder**: Docker
   - **Dockerfile path**: `backend/Dockerfile`
   - **Port**: 3001

4. Configura las **variables de entorno**:
   ```
   DATABASE_URL = <tu connection string de Neon>
   PORT = 3001
   FRONTEND_URL = https://<tu-app>.vercel.app
   ```
   (La URL de Vercel la obtendrás en el siguiente paso)

5. Despliega y copia la **URL pública** que te asigna Koyeb
   - Ejemplo: `https://task-manager-backend-xxx.koyeb.app`

### Paso 3: Frontend en Vercel

1. Ve a [Vercel](https://vercel.com) y crea una cuenta

2. Importa tu proyecto de GitHub

3. Configura el proyecto:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Añade la variable de entorno:
   ```
   VITE_API_URL = https://task-manager-backend-xxx.koyeb.app/api
   ```
   (Usa la URL de Koyeb del paso anterior)

5. Despliega y copia tu **URL de Vercel**
   - Ejemplo: `https://task-manager-xxx.vercel.app`

6. **Importante**: Vuelve a Koyeb y actualiza la variable `FRONTEND_URL` con tu URL de Vercel (para el CORS)

### Paso 4: Dominio personalizado (opcional)

#### Opción A: DNS.HE (recomendado)

1. Registrarse en [DNS.HE.NET](https://dns.he.net)
2. Obtener un subdominio gratuito (ej. `taskmanager.he.net`)
3. Crear registro CNAME apuntando a `cname.vercel-dns.com`
4. En Vercel, añadir el dominio personalizado
5. Esperar a que se verifique (unos minutos)
6. HTTPS se habilita automáticamente

#### Opción B: Otros proveedores gratuitos

- **Freenom**: dominios `.tk`, `.ml`, `.ga`, `.cf`, `.gq`
- **DuckDNS**: subdominios `.duckdns.org`
- **afraid.org**: varios TLDs gratuitos

## 📡 Endpoints de la API

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Listar todas las tareas | - |
| POST | `/api/tasks` | Crear una tarea | `{ "title": "string" }` |
| PUT | `/api/tasks/:id` | Actualizar una tarea | `{ "title"?: "string", "completed"?: boolean }` |
| DELETE | `/api/tasks/:id` | Eliminar una tarea | - |
| GET | `/health` | Health check | - |

### Ejemplos con curl

**Crear tarea:**
```bash
curl -X POST https://tu-api.koyeb.app/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Aprender React"}'
```

**Listar tareas:**
```bash
curl https://tu-api.koyeb.app/api/tasks
```

**Actualizar tarea:**
```bash
curl -X PUT https://tu-api.koyeb.app/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Eliminar tarea:**
```bash
curl -X DELETE https://tu-api.koyeb.app/api/tasks/1
```

## 🗄️ Modelo de datos

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 Scripts útiles

### Backend
```bash
npm run dev              # Desarrollo con hot-reload
npm run build            # Compilar TypeScript
npm start                # Producción
npm run prisma:push      # Sincronizar esquema con DB
npm run prisma:studio    # Abrir GUI de Prisma
```

### Frontend
```bash
npm run dev              # Desarrollo
npm run build            # Build de producción
npm run preview          # Preview del build
```

## 💰 Costos (spoiler: $0)

| Servicio | Plan | Límites | Costo |
|----------|------|---------|-------|
| **Neon** | Free | 0.5 GB storage, 10 GB bandwidth/mes | **$0** |
| **Koyeb** | Free | 512 MB RAM, scale-to-zero | **$0** |
| **Vercel** | Free | 100 GB bandwidth/mes, CDN global | **$0** |
| **DNS.HE** | Free | Subdominio, sin límites | **$0** |
| **Total** | | | **$0/mes** |

## 📚 Aprendizajes del proyecto

Este proyecto es ideal para aprender:
- ✅ Desarrollo full-stack con TypeScript
- ✅ Creación de APIs REST con Express
- ✅ ORMs modernos (Prisma)
- ✅ React hooks y manejo de estado
- ✅ Fetch API y comunicación cliente-servidor
- ✅ Despliegue en servicios cloud
- ✅ Docker básico
- ✅ Variables de entorno
- ✅ CORS y seguridad básica

## 🐛 Troubleshooting

### Error de conexión a la base de datos

```
Error: P1001: Can't reach database server
```

**Solución**: Verifica que tu `DATABASE_URL` sea correcta y que incluya `?sslmode=require`

### Error de CORS

```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solución**: Asegúrate de que la variable `FRONTEND_URL` en el backend coincida con tu URL del frontend

### Backend en Koyeb no responde

**Solución**: El free tier de Koyeb usa "scale-to-zero". La primera petición puede tardar 10-15 segundos (cold start).

### Build falla en Vercel

**Solución**: Verifica que el Root Directory sea `frontend` y que todas las dependencias estén en `package.json`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Neon](https://neon.tech) - PostgreSQL serverless
- [Koyeb](https://koyeb.com) - Hosting de containers
- [Vercel](https://vercel.com) - Hosting de frontend
- [Prisma](https://prisma.io) - Excelente ORM

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue.

---

**¡Happy coding!** 🚀
