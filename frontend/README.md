# Task Manager - Frontend

Frontend del gestor de tareas construido con React, Vite y TypeScript.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **CSS puro** - Estilos sin frameworks (con soporte para dark mode)

## 📋 Requisitos previos

- Node.js 20.x o superior
- npm o yarn
- Backend funcionando (ver carpeta `backend/`)

## 🛠️ Instalación local

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
```bash
cp .env.example .env
```

Edita el archivo `.env` y configura la URL de tu backend:
```env
VITE_API_URL="http://localhost:3001/api"
```

3. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## 🏗️ Construir para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

Para previsualizar la build de producción localmente:
```bash
npm run preview
```

## 🌐 Despliegue en Vercel

1. **Sube el código a GitHub** (si aún no lo has hecho).

2. **Crea una cuenta en [Vercel](https://vercel.com)**.

3. **Importa tu proyecto**:
   - Haz clic en "Add New Project"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio del Task Manager

4. **Configura el proyecto**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (importante!)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Configura las variables de entorno**:
   - Añade `VITE_API_URL` con la URL de tu backend de Render
   - Ejemplo: `https://task-manager-backend-xxx.onrender.com/api`

6. **Despliega**:
   - Haz clic en "Deploy"
   - Espera a que termine el despliegue
   - Copia la URL de tu aplicación (ej. `https://task-manager.vercel.app`)

7. **Actualiza el backend**:
   - Ve a tu servicio en Render
   - Actualiza la variable `FRONTEND_URL` con tu URL de Vercel
   - Redespliega el backend si es necesario

## 🌍 Configurar dominio personalizado (gratuito)

### Opción 1: Dominio gratuito con DNS.HE

1. **Registrarse en [DNS.HE.NET](https://dns.he.net)** (Hurricane Electric):
   - Crea una cuenta gratuita
   - Obtén un subdominio gratuito (ej. `taskmanager.example.com`)

2. **Configurar DNS**:
   - En el panel de DNS.HE, añade un registro CNAME:
     - Name: `taskmanager` (o el nombre que elijas)
     - Type: `CNAME`
     - Value: `cname.vercel-dns.com`

3. **Añadir el dominio en Vercel**:
   - Ve a tu proyecto en Vercel
   - Settings → Domains
   - Añade tu dominio personalizado (ej. `taskmanager.he.net`)
   - Vercel verificará y habilitará HTTPS automáticamente

### Opción 2: Otros proveedores gratuitos

- **Freenom** (`.tk`, `.ml`, `.ga`, `.cf`, `.gq`)
- **InfinityFree** (subdominio gratuito)
- **000webhost** (subdominio gratuito)

## 📂 Estructura del proyecto

```
frontend/
├── src/
│   ├── api/
│   │   └── tasks.ts          # Cliente API con fetch
│   ├── components/
│   │   ├── TaskList.tsx      # Lista principal de tareas
│   │   ├── TaskForm.tsx      # Formulario para crear tareas
│   │   └── TaskItem.tsx      # Componente de tarea individual
│   ├── types/
│   │   └── task.ts           # Tipos TypeScript
│   ├── App.tsx               # Componente principal
│   ├── App.css               # Estilos de la app
│   ├── main.tsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

## 🎨 Características

- ✅ Crear, editar y eliminar tareas
- ✅ Marcar tareas como completadas
- ✅ Contador de tareas completadas
- ✅ Diseño responsive (móvil y escritorio)
- ✅ Dark mode automático según preferencias del sistema
- ✅ Manejo de estados de carga y errores
- ✅ Confirmación antes de eliminar
- ✅ Interfaz limpia y minimalista

## 🔧 Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo con hot-reload
npm run build     # Construir para producción
npm run preview   # Previsualizar build de producción
npm run lint      # Linter (si está configurado)
```

## 🌙 Dark Mode

El dark mode se activa automáticamente según las preferencias del sistema operativo del usuario. No requiere configuración adicional.

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (< 640px)
- 💻 Tablets (640px - 1024px)
- 🖥️ Escritorio (> 1024px)

## 🐛 Troubleshooting

### Error de conexión con el backend

Si ves errores de conexión, verifica:
1. Que el backend esté ejecutándose
2. Que la URL en `.env` sea correcta
3. Que el CORS esté habilitado en el backend

### Build falla en Vercel

Verifica:
1. Que el Root Directory sea `frontend`
2. Que el Build Command sea `npm run build`
3. Que el Output Directory sea `dist`
4. Que la variable `VITE_API_URL` esté configurada

## 📝 Notas

- Todos los archivos de configuración (`.env`) deben crearse a partir de `.env.example`
- Las variables de entorno deben empezar con `VITE_` para ser accesibles en el código
- Vercel reconstruye automáticamente la app en cada push a la rama principal
