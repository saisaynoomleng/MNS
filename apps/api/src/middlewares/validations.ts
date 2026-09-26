import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

export const ValidateBody = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          error: 'Validation Failed',
          details: error.issues.map((e) => ({
            field: e.path.join(','),
            message: e.message,
          })),
        });
      }

      next(error);
    }
  };
};

export const ValidateParams = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          error: 'Validation Failed',
          details: error.issues.map((e) => ({
            field: e.path.join(','),
            message: e.message,
          })),
        });
      }

      next(error);
    }
  };
};
