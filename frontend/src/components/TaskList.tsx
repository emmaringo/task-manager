import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import type { Task } from '../types/task';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las tareas');
      console.error('Error al cargar tareas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (title: string) => {
    try {
      const newTask = await createTask({ title });
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la tarea');
      throw err;
    }
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    try {
      const updatedTask = await updateTask(id, { completed });
      setTasks(tasks.map(task =>
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la tarea');
      throw err;
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la tarea');
      throw err;
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="task-list-container">
      <div className="task-header">
        <h1>📝 Task Manager</h1>
        <p className="task-stats">
          {completedCount} de {totalCount} completada{totalCount !== 1 ? 's' : ''}
        </p>
      </div>

      <TaskForm onSubmit={handleCreateTask} />

      {error && (
        <div className="error-message">
          ⚠️ {error}
          <button onClick={() => setError(null)} className="error-close">×</button>
        </div>
      )}

      {loading ? (
        <div className="loading">Cargando tareas...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>No hay tareas todavía</p>
          <p className="empty-subtitle">¡Crea tu primera tarea arriba!</p>
        </div>
      ) : (
        <div className="tasks">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
