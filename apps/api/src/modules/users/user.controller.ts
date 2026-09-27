import type { Request, Response, NextFunction } from 'express';
import db, {
  AppsTable,
  FeatureRequestsTable,
  UsersTable,
  type SelectUserTable,
} from '../../db/index.js';
import { eq } from 'drizzle-orm';
import type { FeatureRequestFormInput } from '@mns/utils';

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

    edit: async (
      req: Request<{}, {}, SelectUserTable>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { name, companyName, position, id } = req.body;

        await db
          .update(UsersTable)
          .set({
            name,
            companyName,
            position,
          })
          .where(eq(UsersTable.id, id))
          .returning({ userId: UsersTable.id });

        return res
          .status(201)
          .json({ message: 'User info updated successfully!' });
      } catch (error) {
        return next(error);
      }
    },

    requestFeature: async (
      req: Request<{ id: string }, {}, FeatureRequestFormInput>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id: userId } = req.params;
        const { sanityAppId, body } = req.body;

        const app = await db.query.AppsTable.findFirst({
          columns: {
            id: true,
          },
          where: { sanityId: sanityAppId },
        });

        if (!app) {
          return res.status(404).json({
            message: 'App not found',
          });
        }

        await db.insert(FeatureRequestsTable).values({
          userId,
          appId: app.id,
          body,
          status: 'new',
        });

        return res.status(201).json({
          message: 'Feature Requested!',
        });
      } catch (error) {
        console.error('request feature api error', error);
        next(error);
      }
    },
  };
};
