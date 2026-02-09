import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export interface ApiError extends Error {
  statusCode?: number;
}

// Custom error class
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  error: ApiError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        statusCode = 409;
        message = 'A resource with this data already exists';
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Record not found';
        break;
      case 'P2003':
        statusCode = 400;
        message = 'Invalid foreign key constraint';
        break;
      default:
        statusCode = 400;
        message = 'Database operation failed';
    }
  }
  // Handle custom app errors
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Handle other known errors
  else if (error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Handle validation errors
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = error.message;
  }

  // Log error details (in production, use proper logging service)
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    statusCode,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Send error response
  const errorResponse: any = {
    error: message,
    timestamp: new Date().toISOString(),
  };

  // Add error details in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = error.stack;
    errorResponse.details = error.message;
  }

  res.status(statusCode).json(errorResponse);
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Resource not found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
};