import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Manejo de errores de la API
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Función auxiliar para manejar respuestas
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new ApiError(response.status, error.error || `Error ${response.status}`);
  }

  // Manejar respuestas 204 (No Content)
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// Obtener todas las tareas
export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`);
  return handleResponse<Task[]>(response);
}

// Crear una nueva tarea
export async function createTask(data: CreateTaskDto): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Task>(response);
}

// Actualizar una tarea
export async function updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Task>(response);
}

// Eliminar una tarea
export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(response);
}
