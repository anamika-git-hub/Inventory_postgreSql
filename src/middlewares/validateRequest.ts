import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      next(error);
    }
  };

export default validateRequest;
