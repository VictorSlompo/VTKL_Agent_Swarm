// Test setup file
import { prisma } from '../db';

// Set test environment
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'file:./test.db';

// Global test timeout
jest.setTimeout(10000);

// Mock console.log during tests to keep output clean
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  console.log = jest.fn();
  console.error = jest.fn();
});

afterAll(async () => {
  // Restore console functions
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  
  // Clean up database connection
  await prisma.$disconnect();
});