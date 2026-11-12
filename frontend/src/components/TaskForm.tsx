import { useState, FormEvent } from 'react';

interface TaskFormProps {
  onSubmit: (title: string) => Promise<void>;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setIsSubmitting(true);
    try {
      await onSubmit(trimmedTitle);
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Escribe una nueva tarea..."
        disabled={isSubmitting}
        className="task-input"
        maxLength={200}
      />
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="submit-button"
      >
        {isSubmitting ? 'Agregando...' : 'Agregar'}
      </button>
    </form>
  );
}
