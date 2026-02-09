# TaskFlow Backend API

TaskFlow MVP Backend - A task management API built with Node.js, TypeScript, and Prisma.

## Features

- Task CRUD operations
- Priority levels (low, medium, high)
- Status tracking (todo, in_progress, completed)
- AI priority scoring (optional)
- SQLite database for development
- TypeScript support
- Prisma ORM

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment:
   ```bash
   cp .env.example .env
   ```

3. Run database migrations:
   ```bash
   npm run db:migrate
   ```

4. Seed the database (optional):
   ```bash
   npm run db:seed
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## Scripts

- `npm run build` - Build the TypeScript code
- `npm run start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## API Endpoints

- `GET /health` - Health check
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task

## Task Model

```typescript
{
  id: string (uuid)
  title: string
  description?: string
  dueDate?: DateTime
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in_progress' | 'completed'
  createdAt: DateTime
  updatedAt: DateTime
  aiPriorityScore?: number
  aiPriorityReason?: string
}
```