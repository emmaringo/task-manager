import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Obtener todas las tareas
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

// Crear una nueva tarea
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// Actualizar una tarea
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    // Verificar que la tarea existe
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Preparar datos para actualizar
    const updateData: any = {};
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({ error: 'El título no puede estar vacío' });
      }
      updateData.title = title.trim();
    }
    if (completed !== undefined) {
      updateData.completed = Boolean(completed);
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    res.json(task);
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

// Eliminar una tarea
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    // Verificar que la tarea existe
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};
