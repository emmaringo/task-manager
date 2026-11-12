import { useState } from 'react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(task.id, !task.completed);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={isToggling || isDeleting}
          className="task-checkbox"
        />
        <span className="task-title">{task.title}</span>
      </div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="delete-button"
        aria-label="Eliminar tarea"
      >
        {isDeleting ? '...' : '🗑️'}
      </button>
    </div>
  );
}
