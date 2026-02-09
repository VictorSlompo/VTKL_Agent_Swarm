import { z } from 'zod';

// Enums
export const PrioritySchema = z.enum(['low', 'medium', 'high']);
export const StatusSchema = z.enum(['todo', 'in_progress', 'done', 'blocked']);

// Create task schema
export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  priority: PrioritySchema.optional().default('low'),
  estimatedHours: z.number().positive('Estimated hours must be positive').max(1000, 'Estimated hours must be less than 1000').optional(),
  dueDate: z.string().datetime('Invalid date format').optional(),
  squad: z.string().max(50, 'Squad name must be less than 50 characters').optional(),
});

// Update task schema (all fields optional except for validation rules)
export const UpdateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  priority: PrioritySchema.optional(),
  estimatedHours: z.number().positive('Estimated hours must be positive').max(1000, 'Estimated hours must be less than 1000').optional(),
  dueDate: z.string().datetime('Invalid date format').optional(),
  status: StatusSchema.optional(),
  squad: z.string().max(50, 'Squad name must be less than 50 characters').optional(),
});

// Status update schema
export const UpdateStatusSchema = z.object({
  status: StatusSchema,
});

// Query parameters schema for filtering
export const TaskFiltersSchema = z.object({
  status: StatusSchema.optional(),
  priority: PrioritySchema.optional(),
  squad: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

// UUID validation
export const UUIDSchema = z.string().uuid('Invalid task ID format');

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
export type UpdateStatusInput = z.infer<typeof UpdateStatusSchema>;
export type TaskFilters = z.infer<typeof TaskFiltersSchema>;