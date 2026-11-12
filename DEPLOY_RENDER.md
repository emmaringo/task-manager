# 🚀 Guía de Despliegue en Render

Esta guía te llevará paso a paso para desplegar tu Task Manager usando **Render.com** como backend (100% gratuito).

## 📋 Requisitos previos

- Cuenta en [GitHub](https://github.com)
- Cuenta en [Neon](https://neon.tech) (base de datos)
- Cuenta en [Render](https://render.com) (backend)
- Cuenta en [Vercel](https://vercel.com) (frontend)

---

## Paso 1: Preparar la Base de Datos (Neon)

### 1.1 Crear proyecto en Neon

1. Ve a [https://neon.tech](https://neon.tech) y crea una cuenta
2. Haz clic en **"Create a project"**
3. Elige un nombre para tu proyecto (ej. `task-manager-db`)
4. Selecciona la región más cercana
5. Haz clic en **"Create project"**

### 1.2 Obtener la cadena de conexión

1. En el dashboard de tu proyecto, busca **"Connection Details"**
2. Copia la **Connection String** completa
3. Debe verse algo así:
   ```
   postgresql://usuario:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Guárdala en un lugar seguro, la necesitarás después

---

## Paso 2: Subir el Código a GitHub

Si aún no has subido tu código a GitHub:

```bash
cd task-manager
git init
git add .
git commit -m "Initial commit: Task Manager with Render support"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/task-manager.git
git push -u origin main
```

---

## Paso 3: Desplegar el Backend en Render

### 3.1 Crear cuenta en Render

1. Ve a [https://render.com](https://render.com)
2. Haz clic en **"Get Started for Free"**
3. Regístrate usando tu cuenta de GitHub (recomendado)

### 3.2 Crear Web Service

1. En el dashboard de Render, haz clic en **"New +"** en la parte superior
2. Selecciona **"Web Service"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Busca y selecciona tu repositorio `task-manager`
5. Haz clic en **"Connect"**

### 3.3 Configurar el servicio

Rellena los siguientes campos:

- **Name**: `task-manager-backend` (o el nombre que prefieras)
- **Region**: Selecciona la región más cercana a ti
  - Para Latinoamérica: `Oregon (US West)`
  - Para Europa: `Frankfurt`
- **Branch**: `main`
- **Root Directory**: `backend`
- **Environment**: `Docker`
- **Docker Command**: (déjalo vacío, usará el CMD del Dockerfile)

### 3.4 Seleccionar el plan

- **Instance Type**: Selecciona **"Free"**
  - 512 MB RAM
  - Compartido CPU
  - Scale-to-zero después de 15 min de inactividad

### 3.5 Añadir variables de entorno

Haz scroll hasta la sección **"Environment Variables"** y añade:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | La connection string de Neon que copiaste antes |
| `PORT` | `3001` |
| `FRONTEND_URL` | `https://temporal.vercel.app` (lo actualizaremos después) |
| `NODE_ENV` | `production` |

### 3.6 Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir tu aplicación
3. Este proceso puede tardar **2-5 minutos** la primera vez
4. Verás logs en tiempo real del proceso

### 3.7 Obtener la URL del backend

Una vez que el deploy termine exitosamente:

1. En la parte superior verás tu URL pública
2. Será algo como: `https://task-manager-backend-xxx.onrender.com`
3. Cópiala, la necesitarás para el frontend

### 3.8 Verificar que funcione

Abre en tu navegador:
```
https://task-manager-backend-xxx.onrender.com/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2026-11-12T01:20:00.000Z"
}
```

⚠️ **Nota**: Si es la primera petición después de inactividad, puede tardar 30-50 segundos (cold start).

---

## Paso 4: Desplegar el Frontend en Vercel

### 4.1 Crear cuenta en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Haz clic en **"Start Deploying"**
3. Regístrate con tu cuenta de GitHub

### 4.2 Importar proyecto

1. En el dashboard, haz clic en **"Add New..."** → **"Project"**
2. Busca tu repositorio `task-manager`
3. Haz clic en **"Import"**

### 4.3 Configurar el proyecto

- **Framework Preset**: `Vite` (debería detectarlo automáticamente)
- **Root Directory**: Haz clic en **"Edit"** y selecciona `frontend`
- **Build Command**: `npm run build` (por defecto)
- **Output Directory**: `dist` (por defecto)

### 4.4 Añadir variable de entorno

En la sección **"Environment Variables"**:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://task-manager-backend-xxx.onrender.com/api` |

⚠️ **Importante**: Usa la URL de Render que copiaste en el paso 3.7 y añade `/api` al final.

### 4.5 Desplegar

1. Haz clic en **"Deploy"**
2. Vercel construirá tu frontend (tarda 1-2 minutos)
3. Una vez terminado, verás tu URL de producción
4. Será algo como: `https://task-manager-xxx.vercel.app`

### 4.6 Probar la aplicación

Abre tu URL de Vercel en el navegador y prueba:
- Crear una tarea
- Marcarla como completada
- Eliminarla

---

## Paso 5: Actualizar la URL del Frontend en Render

### 5.1 Volver a Render

1. Ve al dashboard de Render
2. Haz clic en tu servicio `task-manager-backend`
3. Ve a la pestaña **"Environment"**

### 5.2 Actualizar FRONTEND_URL

1. Busca la variable `FRONTEND_URL`
2. Haz clic en el ícono de editar
3. Cambia el valor a tu URL de Vercel: `https://task-manager-xxx.vercel.app`
4. Haz clic en **"Save Changes"**

### 5.3 Redeploy automático

Render detectará el cambio y hará un redeploy automáticamente. Espera 2-3 minutos.

---

## ✅ ¡Listo!

Tu aplicación ahora está desplegada y funcionando:

- **Frontend**: `https://task-manager-xxx.vercel.app`
- **Backend**: `https://task-manager-backend-xxx.onrender.com`
- **Base de datos**: Neon PostgreSQL

Todo completamente **GRATIS** 🎉

---

## 🔄 Actualizaciones futuras

### Actualizar el backend

Cada vez que hagas `git push` a tu rama `main`, Render detectará los cambios y:
1. Hará un build automático
2. Desplegará la nueva versión
3. Todo sin intervención manual

### Actualizar el frontend

Igual que con el backend, Vercel desplegará automáticamente cada push a `main`.

---

## 🐛 Problemas comunes

### El backend tarda mucho en responder

**Causa**: El plan gratuito de Render usa "scale-to-zero". Después de 15 minutos sin actividad, el servicio se duerme.

**Solución**: Es normal. La primera petición tarda 30-50 segundos. Las siguientes son instantáneas.

### Error de CORS

**Causa**: La variable `FRONTEND_URL` no coincide con tu URL real de Vercel.

**Solución**: 
1. Verifica que `FRONTEND_URL` en Render sea exactamente tu URL de Vercel
2. No añadas `/` al final
3. No añadas `/api`

### Build falla en Render

**Causa**: Falta alguna variable de entorno o hay un error en el código.

**Solución**: 
1. Revisa los logs de Render (pestaña "Logs")
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que `DATABASE_URL` incluya `?sslmode=require`

### Build falla en Vercel

**Causa**: El Root Directory no está configurado correctamente.

**Solución**:
1. Ve a Settings → General en tu proyecto de Vercel
2. En "Root Directory" debe estar `frontend`
3. Haz un redeploy manual

### No puedo conectar a la base de datos

**Causa**: La URL de Neon es incorrecta o ha expirado.

**Solución**:
1. Ve al dashboard de Neon
2. Copia nuevamente la Connection String
3. Actualízala en Render
4. Espera el redeploy

---

## 📊 Monitoreo

### Ver logs del backend

1. Ve al dashboard de Render
2. Haz clic en tu servicio
3. Ve a la pestaña **"Logs"**
4. Verás logs en tiempo real

### Ver logs del frontend

1. Ve al dashboard de Vercel
2. Haz clic en tu proyecto
3. Ve a la pestaña **"Deployments"**
4. Haz clic en cualquier deployment
5. Ve a **"Logs"**

### Ver la base de datos

1. En tu proyecto local, ejecuta:
   ```bash
   cd backend
   npm run prisma:studio
   ```
2. Se abrirá una interfaz web en `http://localhost:5555`
3. Podrás ver, editar y eliminar datos

---

## 💡 Consejos

1. **Cold starts**: Para mantener el backend activo, puedes usar servicios como [cron-job.org](https://cron-job.org) para hacer un ping cada 10 minutos a tu endpoint `/health`

2. **Dominios personalizados**: Tanto Render como Vercel permiten añadir dominios personalizados gratis (necesitas un dominio propio)

3. **Logs**: Revisa regularmente los logs para detectar errores temprano

4. **Backups**: Neon hace backups automáticos, pero considera exportar tu DB periódicamente

5. **Variables de entorno**: NUNCA subas archivos `.env` a GitHub. Usa siempre `.env.example` como plantilla

---

## 🎯 Próximos pasos

Ahora que tienes tu aplicación desplegada, puedes:

- Añadir autenticación con JWT
- Implementar categorías para las tareas
- Añadir fechas límite
- Implementar búsqueda y filtros
- Añadir un sistema de usuarios

¡Happy coding! 🚀
