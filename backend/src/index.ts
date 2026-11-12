import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/api', taskRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks',
      health: '/health',
    },
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📋 API disponible en http://localhost:${PORT}/api/tasks`);
  console.log(`🌍 CORS habilitado para: ${FRONTEND_URL}`);
});
