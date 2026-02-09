import { prisma } from './db';

async function main() {
  console.log('Seeding database...');

  // Create sample tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'Setup project structure',
      description: 'Initialize Node.js project with TypeScript and Prisma',
      priority: 'high',
      status: 'completed'
    }
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Implement authentication',
      description: 'Add JWT-based authentication system',
      priority: 'medium',
      status: 'todo',
      dueDate: new Date('2025-03-01')
    }
  });

  const task3 = await prisma.task.create({
    data: {
      title: 'Create API endpoints',
      description: 'Build REST API for task management',
      priority: 'high',
      status: 'in_progress'
    }
  });

  console.log('Database seeded successfully!');
  console.log({ task1, task2, task3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });