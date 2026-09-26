import type { Request, Response, NextFunction } from 'express';
import db, { UsersTable, type SelectUserTable } from '../../db/index.js';
import { eq } from 'drizzle-orm';

export const userController = () => {
  return {
    getAll: () => {},

    getById: async (
      req: Request<{ id: string }>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;

        const user = await db.query.UsersTable.findFirst({
          with: {
            address: true,
          },
          columns: {
            id: true,
            name: true,
            email: true,
            phone: true,
            companyName: true,
            position: true,
          },
          where: { id },
        });

        if (!user) {
          return res.status(404).json({
            message: 'User not found',
          });
        }

        return res.status(200).json(user);
      } catch (error) {
        console.error(`Get User by ID error`, error);

        return next(error);
      }
    },

    edit: () => {},
  };
};
