import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
import { ZodError } from 'zod';

export const globalErrorHandler = (
  err: Error | CustomError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
   if (err instanceof ZodError) {
     res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  const statusCode = (err instanceof CustomError && err.statusCode) || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};
