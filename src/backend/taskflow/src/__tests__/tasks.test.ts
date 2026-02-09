import request from 'supertest';
import express from 'express';
import { prisma } from '../db';
import tasksRouter from '../routes/tasks';
import { errorHandler } from '../middleware/errorHandler';

// Create test app
const app = express();
app.use(express.json());
app.use('/api/tasks', tasksRouter);
app.use(errorHandler);

// Test data
const testTask = {
  title: 'Test Task',
  description: 'Test task description',
  priority: 'medium' as const,
  estimatedHours: 4,
  squad: 'Backend Team',
};

const updateTaskData = {
  title: 'Updated Test Task',
  description: 'Updated task description',
  priority: 'high' as const,
  estimatedHours: 6,
  squad: 'Frontend Team',
};

describe('Tasks API', () => {
  let createdTaskId: string;

  // Clean up database before each test
  beforeEach(async () => {
    await prisma.task.deleteMany();
  });

  // Clean up after all tests
  afterAll(async () => {
    await prisma.task.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task successfully', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send(testTask)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        title: testTask.title,
        description: testTask.description,
        priority: testTask.priority,
        estimatedHours: testTask.estimatedHours,
        squad: testTask.squad,
        status: 'todo',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      createdTaskId = response.body.id;
    });

    it('should fail to create task without title', async () => {
      const invalidTask = { ...testTask };
      delete (invalidTask as any).title;

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body.error).toBe('Validation error');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'title',
            message: 'Title is required',
          }),
        ])
      );
    });

    it('should fail with invalid priority', async () => {
      const invalidTask = { ...testTask, priority: 'invalid' };

      await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      // Create test tasks
      await prisma.task.createMany({
        data: [
          { title: 'Task 1', priority: 'low', status: 'todo', squad: 'Team A' },
          { title: 'Task 2', priority: 'high', status: 'in_progress', squad: 'Team B' },
          { title: 'Task 3', priority: 'medium', status: 'done', squad: 'Team A' },
        ],
      });
    });

    it('should return all tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.data).toHaveLength(3);
      expect(response.body.meta).toEqual({
        total: 3,
        limit: 20,
        offset: 0,
        hasMore: false,
      });
    });

    it('should filter tasks by status', async () => {
      const response = await request(app)
        .get('/api/tasks?status=todo')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].status).toBe('todo');
    });

    it('should filter tasks by squad', async () => {
      const response = await request(app)
        .get('/api/tasks?squad=Team A')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.data.every((task: any) => task.squad === 'Team A')).toBe(true);
    });

    it('should paginate results', async () => {
      const response = await request(app)
        .get('/api/tasks?limit=2&offset=1')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.meta).toEqual({
        total: 3,
        limit: 2,
        offset: 1,
        hasMore: false,
      });
    });
  });

  describe('GET /api/tasks/:id', () => {
    let taskId: string;

    beforeEach(async () => {
      const task = await prisma.task.create({
        data: { title: 'Get Task Test', priority: 'low' },
      });
      taskId = task.id;
    });

    it('should return a specific task', async () => {
      const response = await request(app)
        .get(`/api/tasks/${taskId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: taskId,
        title: 'Get Task Test',
        priority: 'low',
      });
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';
      
      const response = await request(app)
        .get(`/api/tasks/${fakeId}`)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });

    it('should return 400 for invalid UUID', async () => {
      await request(app)
        .get('/api/tasks/invalid-id')
        .expect(400);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let taskId: string;

    beforeEach(async () => {
      const task = await prisma.task.create({
        data: testTask,
      });
      taskId = task.id;
    });

    it('should update a task successfully', async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send(updateTaskData)
        .expect(200);

      expect(response.body).toMatchObject({
        id: taskId,
        ...updateTaskData,
      });
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';
      
      await request(app)
        .put(`/api/tasks/${fakeId}`)
        .send(updateTaskData)
        .expect(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId: string;

    beforeEach(async () => {
      const task = await prisma.task.create({
        data: testTask,
      });
      taskId = task.id;
    });

    it('should delete a task successfully', async () => {
      await request(app)
        .delete(`/api/tasks/${taskId}`)
        .expect(204);

      // Verify task is deleted
      const deletedTask = await prisma.task.findUnique({
        where: { id: taskId },
      });
      expect(deletedTask).toBeNull();
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';
      
      await request(app)
        .delete(`/api/tasks/${fakeId}`)
        .expect(404);
    });
  });

  describe('PATCH /api/tasks/:id/status', () => {
    let taskId: string;

    beforeEach(async () => {
      const task = await prisma.task.create({
        data: { ...testTask, status: 'todo' },
      });
      taskId = task.id;
    });

    it('should update task status successfully', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${taskId}/status`)
        .send({ status: 'in_progress' })
        .expect(200);

      expect(response.body).toMatchObject({
        id: taskId,
        status: 'in_progress',
      });
    });

    it('should fail with invalid status', async () => {
      await request(app)
        .patch(`/api/tasks/${taskId}/status`)
        .send({ status: 'invalid_status' })
        .expect(400);
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';
      
      await request(app)
        .patch(`/api/tasks/${fakeId}/status`)
        .send({ status: 'done' })
        .expect(404);
    });
  });
});