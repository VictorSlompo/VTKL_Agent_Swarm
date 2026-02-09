export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in_progress' | 'done' | 'blocked';

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  estimatedHours?: number;
  dueDate?: string; // ISO date string
  squad?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: Priority;
  estimatedHours?: number;
  dueDate?: string; // ISO date string
  status?: Status;
  squad?: string;
  aiPriorityScore?: number;
  aiPriorityReason?: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  priority: Priority;
  estimatedHours: number | null;
  dueDate: string | null;
  status: Status;
  squad: string | null;
  createdAt: string;
  updatedAt: string;
  aiPriorityScore: number | null;
  aiPriorityReason: string | null;
}

export interface TaskFilters {
  status?: Status;
  priority?: Priority;
  squad?: string;
  limit?: number;
  offset?: number;
}