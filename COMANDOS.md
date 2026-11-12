# 🚀 Guía rápida de comandos - Task Manager

Esta guía contiene todos los comandos necesarios para ejecutar el proyecto Task Manager en local y desplegarlo en producción de forma gratuita.

---

## 📋 ÍNDICE

1. [Configuración inicial](#configuración-inicial)
2. [Desarrollo local](#desarrollo-local)
3. [Despliegue en producción](#despliegue-en-producción)
4. [Comandos útiles](#comandos-útiles)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 CONFIGURACIÓN INICIAL

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio-url>
cd task-manager
```

### 2. Configurar Base de datos en Neon

1. Ir a https://neon.tech y crear cuenta
2. Crear nuevo proyecto PostgreSQL
3. Copiar la Connection String (tendrá este formato):
   ```
   postgresql://usuario:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

---

## 💻 DESARROLLO LOCAL

### Backend (Terminal 1)

```bash
# Ir a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env y configurar tu DATABASE_URL de Neon
nano .env  # o usa tu editor favorito

# Generar cliente Prisma y sincronizar esquema con la base de datos
npm run prisma:push

# (Opcional) Ver la base de datos en una GUI
npm run prisma:studio

# Iniciar servidor en modo desarrollo (puerto 3001)
npm run dev
```

✅ Backend listo en: `http://localhost:3001`

### Frontend (Terminal 2)

```bash
# Ir a la carpeta del frontend (desde la raíz del proyecto)
cd frontend

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env (debería estar correcto por defecto para desarrollo local)
nano .env

# Iniciar aplicación en modo desarrollo (puerto 5173)
npm run dev
```

✅ Frontend listo en: `http://localhost:5173`

### (Opcional) PostgreSQL local con Docker

Si prefieres usar PostgreSQL local en lugar de Neon:

```bash
# Desde la raíz del proyecto
docker-compose up -d

# Tu DATABASE_URL sería:
# DATABASE_URL="postgresql://taskmanager:taskmanager123@localhost:5432/taskmanager"
```

---

## 🌐 DESPLIEGUE EN PRODUCCIÓN

### 1. Preparar repositorio en GitHub

```bash
# Inicializar git (si no lo has hecho)
git init

# Añadir archivos
git add .

# Primer commit
git commit -m "Initial commit: Task Manager full-stack"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/task-manager.git

# Subir código
git branch -M main
git push -u origin main
```

### 2. Desplegar Backend en Koyeb

**En el navegador:**

1. Ir a https://app.koyeb.com y crear cuenta
2. Clic en "Create Service"
3. Seleccionar "GitHub" → Conectar repositorio
4. Configuración:
   - **Repository**: tu-usuario/task-manager
   - **Branch**: main
   - **Builder**: Docker
   - **Dockerfile path**: `backend/Dockerfile`
   - **Port**: 3001

5. **Variables de entorno** (añadir estas):
   ```
   DATABASE_URL=postgresql://usuario:password@host.neon.tech/neondb?sslmode=require
   PORT=3001
   FRONTEND_URL=https://tu-app.vercel.app
   ```
   ⚠️ `FRONTEND_URL` lo actualizarás después de desplegar el frontend

6. Clic en "Deploy"
7. **Copiar la URL pública** que te asigna Koyeb
   - Ejemplo: `https://task-manager-backend-xxxxx.koyeb.app`

### 3. Desplegar Frontend en Vercel

**En el navegador:**

1. Ir a https://vercel.com y crear cuenta
2. Clic en "Add New Project"
3. Importar desde GitHub → seleccionar tu repositorio
4. Configuración:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (ya viene por defecto)
   - **Output Directory**: `dist` (ya viene por defecto)

5. **Variable de entorno** (añadir en "Environment Variables"):
   ```
   VITE_API_URL=https://task-manager-backend-xxxxx.koyeb.app/api
   ```
   ⚠️ Usar la URL de Koyeb del paso anterior + `/api`

6. Clic en "Deploy"
7. **Copiar tu URL de Vercel**
   - Ejemplo: `https://task-manager-xxxxx.vercel.app`

### 4. Actualizar CORS en el Backend

**Volver a Koyeb:**

1. Ir a tu servicio en Koyeb
2. Settings → Environment Variables
3. Editar `FRONTEND_URL` con tu URL de Vercel:
   ```
   FRONTEND_URL=https://task-manager-xxxxx.vercel.app
   ```
4. Guardar (el servicio se redespliegará automáticamente)

### 5. (Opcional) Dominio personalizado gratuito

#### Con DNS.HE:

1. Ir a https://dns.he.net → Crear cuenta
2. Free DNS → Añadir dominio/subdominio
3. Crear registro CNAME:
   ```
   Name: taskmanager
   Type: CNAME
   Value: cname.vercel-dns.com
   ```
4. En Vercel → Settings → Domains → Add Domain
5. Añadir `taskmanager.he.net` (o el que hayas elegido)
6. Esperar verificación (5-10 minutos)
7. ✅ HTTPS se habilita automáticamente

---

## 🛠️ COMANDOS ÚTILES

### Backend

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Ejecutar en producción
npm start

# Sincronizar esquema Prisma con la base de datos (sin migraciones)
npm run prisma:push

# Crear migración (producción)
npm run prisma:migrate

# Abrir Prisma Studio (GUI de base de datos)
npm run prisma:studio

# Regenerar cliente Prisma
npx prisma generate
```

### Frontend

```bash
# Desarrollo con hot-reload
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Docker (PostgreSQL local)

```bash
# Iniciar PostgreSQL
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener PostgreSQL
docker-compose down

# Detener y eliminar volúmenes (¡borra los datos!)
docker-compose down -v
```

### Git

```bash
# Ver estado
git status

# Añadir cambios
git add .

# Commit
git commit -m "Tu mensaje"

# Push
git push

# Pull últimos cambios
git pull
```

---

## 🐛 TROUBLESHOOTING

### Error: "Can't reach database server"

**Problema**: No se puede conectar a PostgreSQL

**Solución**:
```bash
# Verifica que tu DATABASE_URL sea correcta
echo $DATABASE_URL

# Debe incluir ?sslmode=require al final para Neon
# Ejemplo correcto:
# postgresql://user:pass@host.neon.tech/neondb?sslmode=require
```

### Error: "CORS policy blocked"

**Problema**: El frontend no puede comunicarse con el backend

**Solución**:
```bash
# Verifica que FRONTEND_URL en el backend coincida con la URL del frontend
# Ejemplo en local:
# FRONTEND_URL="http://localhost:5173"

# Ejemplo en producción:
# FRONTEND_URL="https://tu-app.vercel.app"
```

### Error: "Module not found" o "Cannot find package"

**Problema**: Dependencias no instaladas

**Solución**:
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: Backend en Koyeb no responde (cold start)

**Problema**: El free tier de Koyeb hace "scale-to-zero"

**Solución**: Espera 10-15 segundos en la primera petición. Esto es normal y no se puede evitar en el free tier.

### Error: Prisma Client no generado

**Problema**: `@prisma/client` no está generado

**Solución**:
```bash
cd backend
npx prisma generate
```

### Build falla en Vercel

**Problema**: Error en el build del frontend

**Solución**:
```bash
# Verifica localmente que el build funciona
cd frontend
npm run build

# Si funciona en local pero falla en Vercel, verifica:
# 1. Root Directory = "frontend"
# 2. Output Directory = "dist"
# 3. Build Command = "npm run build"
```

### Frontend no se conecta al backend en producción

**Problema**: Variable de entorno incorrecta

**Solución**:
1. En Vercel → Settings → Environment Variables
2. Verifica que `VITE_API_URL` termina en `/api`:
   ```
   VITE_API_URL=https://tu-backend.koyeb.app/api
   ```
3. Redeploy desde Vercel (Deployments → ... → Redeploy)

---

## 📊 VERIFICAR QUE TODO FUNCIONA

### En local:

```bash
# 1. Verificar backend (debería devolver un JSON con info de la API)
curl http://localhost:3001/health

# 2. Verificar que puedes crear una tarea
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test tarea"}'

# 3. Verificar que puedes listar tareas
curl http://localhost:3001/api/tasks

# 4. Abrir frontend en navegador
# http://localhost:5173
```

### En producción:

```bash
# 1. Verificar backend
curl https://tu-backend.koyeb.app/health

# 2. Crear tarea de prueba
curl -X POST https://tu-backend.koyeb.app/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test en producción"}'

# 3. Abrir tu app en el navegador
# https://tu-app.vercel.app
```

---

## 📚 RECURSOS ADICIONALES

- **Neon Docs**: https://neon.tech/docs
- **Koyeb Docs**: https://www.koyeb.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Vite Docs**: https://vitejs.dev
- **Express Docs**: https://expressjs.com

---

## ✅ CHECKLIST DE DESPLIEGUE

- [ ] Código en GitHub
- [ ] Base de datos creada en Neon
- [ ] Backend desplegado en Koyeb
- [ ] Frontend desplegado en Vercel
- [ ] Variable `FRONTEND_URL` actualizada en Koyeb
- [ ] Variable `VITE_API_URL` configurada en Vercel
- [ ] Aplicación funciona correctamente
- [ ] (Opcional) Dominio personalizado configurado

---

## 🎉 ¡FELICIDADES!

Si has llegado hasta aquí, tienes una aplicación full-stack funcionando en producción de forma **100% gratuita**.

**Costos totales**: $0/mes 🎊

¿Preguntas? Abre un issue en el repositorio.
