export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in_progress' | 'completed';

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: string; // ISO date string
  priority?: Priority;
  status?: Status;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  dueDate?: string; // ISO date string
  priority?: Priority;
  status?: Status;
  aiPriorityScore?: number;
  aiPriorityReason?: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
  aiPriorityScore: number | null;
  aiPriorityReason: string | null;
}