import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

export const ValidateBody = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).json({
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
