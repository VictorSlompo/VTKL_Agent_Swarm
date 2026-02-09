import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { validateSchema, ValidationRequest } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  UpdateStatusSchema,
  TaskFiltersSchema,
  UUIDSchema,
} from '../validation/schemas';

const router = Router();

// Params validation schema
const TaskParamsSchema = z.object({
  id: UUIDSchema,
});

/**
 * POST /api/tasks
 * Create a new task
 */
router.post('/', validateSchema(CreateTaskSchema, 'body'), async (req: ValidationRequest, res) => {
  const { title, description, priority, estimatedHours, dueDate, squad } = req.validatedData;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      estimatedHours,
      dueDate: dueDate ? new Date(dueDate) : null,
      squad,
    },
  });

  res.status(201).json(task);
});

/**
 * GET /api/tasks
 * List all tasks with filtering and pagination
 */
router.get('/', validateSchema(TaskFiltersSchema, 'query'), async (req: ValidationRequest, res) => {
  const { status, priority, squad, limit, offset } = req.validatedData;

  // Build where clause for filtering
  const where: any = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (squad) where.squad = squad;

  // Get tasks with pagination
  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.task.count({ where }),
  ]);

  res.json({
    data: tasks,
    meta: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  });
});

/**
 * GET /api/tasks/:id
 * Get single task by ID
 */
router.get('/:id', validateSchema(TaskParamsSchema, 'params'), async (req: ValidationRequest, res) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.json(task);
});

/**
 * PUT /api/tasks/:id
 * Update entire task
 */
router.put('/:id', 
  validateSchema(TaskParamsSchema, 'params'),
  validateSchema(UpdateTaskSchema, 'body'),
  async (req: ValidationRequest, res) => {
    const { id } = req.params;
    const updateData = req.validatedData;

    // Convert dueDate string to Date object if provided
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    try {
      const task = await prisma.task.update({
        where: { id },
        data: updateData,
      });

      res.json(task);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Task not found', 404);
      }
      throw error;
    }
  }
);

/**
 * DELETE /api/tasks/:id
 * Delete task
 */
router.delete('/:id', validateSchema(TaskParamsSchema, 'params'), async (req: ValidationRequest, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new AppError('Task not found', 404);
    }
    throw error;
  }
});

/**
 * PATCH /api/tasks/:id/status
 * Update task status only
 */
router.patch('/:id/status',
  validateSchema(TaskParamsSchema, 'params'),
  validateSchema(UpdateStatusSchema, 'body'),
  async (req: ValidationRequest, res) => {
    const { id } = req.params;
    const { status } = req.validatedData;

    try {
      const task = await prisma.task.update({
        where: { id },
        data: { 
          status,
          updatedAt: new Date(),
        },
      });

      res.json(task);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError('Task not found', 404);
      }
      throw error;
    }
  }
);

export default router;