import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export interface ValidationRequest extends Request {
  validatedData?: any;
}

// Generic validation middleware factory
export const validateSchema = (schema: z.ZodSchema, source: 'body' | 'params' | 'query' = 'body') => {
  return (req: ValidationRequest, res: Response, next: NextFunction) => {
    try {
      let dataToValidate;
      switch (source) {
        case 'body':
          dataToValidate = req.body;
          break;
        case 'params':
          dataToValidate = req.params;
          break;
        case 'query':
          dataToValidate = req.query;
          break;
        default:
          dataToValidate = req.body;
      }

      const validatedData = schema.parse(dataToValidate);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return res.status(400).json({
          error: 'Validation error',
          details: errors,
        });
      }
      next(error);
    }
  };
};