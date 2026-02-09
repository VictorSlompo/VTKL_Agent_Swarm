import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { prisma } from './db';
import { requestLogger, securityLogger } from './middleware/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import tasksRouter from './routes/tasks';

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Please try again later',
  }
});
app.use(limiter);

// Request parsing and logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(securityLogger);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/tasks', tasksRouter);

// Handle 404s
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 TaskFlow API server running on port ${PORT}`);
  console.log(`📖 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 API base URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n🔄 ${signal} received. Starting graceful shutdown...`);
  
  server.close(async (err) => {
    if (err) {
      console.error('❌ Error during server shutdown:', err);
      process.exit(1);
    }
    
    try {
      await prisma.$disconnect();
      console.log('✅ Database connection closed');
      console.log('👋 Server shut down gracefully');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during database shutdown:', error);
      process.exit(1);
    }
  });
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown after 30 seconds');
    process.exit(1);
  }, 30000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));