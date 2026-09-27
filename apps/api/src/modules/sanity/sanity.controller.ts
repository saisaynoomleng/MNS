import type { SanityAppWebhookSchemaType } from '@mns/utils';
import type { Request, Response, NextFunction } from 'express';
import db, { AppsTable } from '../../db/index.js';
import z from 'zod';
import { eq } from 'drizzle-orm';

const sanityOperationSchema = z.enum(['create', 'update', 'delete']);

export const sanityController = () => {
  return {
    createApp: async (
      req: Request<{}, {}, SanityAppWebhookSchemaType>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const sanityOperation = req.headers['sanity-operation'];

        const operation = sanityOperationSchema.safeParse(sanityOperation);

        if (!operation.success) {
          return res.status(400).json(
            operation.error.issues.map((e) => ({
              error: e,
              path: e.path.join('.'),
              message: e.message,
            })),
          );
        }

        const { _id, name, _type } = req.body;

        if (_type !== 'app') {
          return res.status(400).json({
            message: 'Not a specified app',
          });
        }

        switch (operation.data) {
          case 'create': {
            await db
              .insert(AppsTable)
              .values({
                sanityId: _id,
                name,
              })
              .onConflictDoUpdate({
                target: AppsTable.sanityId,
                set: {
                  name,
                  updatedAt: new Date(),
                },
              });

            return res.status(200).json({
              message: 'App Synchronized',
            });
          }

          case 'update': {
            await db
              .update(AppsTable)
              .set({
                name,
              })
              .where(eq(AppsTable.sanityId, _id));

            return res.status(200).json({
              message: 'App updated',
            });
          }

          case 'delete': {
            await db.delete(AppsTable).where(eq(AppsTable.sanityId, _id));

            return res.status(200).json({
              message: 'App Deleted',
            });
          }
        }
      } catch (error) {
        console.error('Sanity webhook app error', error);
        next(error);
      }
    },
  };
};
