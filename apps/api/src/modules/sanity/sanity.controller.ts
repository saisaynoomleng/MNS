import type { SanityAppWebhookSchemaType } from '@mns/utils';
import type { Request, Response, NextFunction } from 'express';
import db, { AppsTable } from '../../db/index.js';

export const sanityController = () => {
  return {
    createApp: async (
      req: Request<{}, {}, SanityAppWebhookSchemaType>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { _id, name, _type } = req.body;

        if (_type !== 'app') {
          return res.status(400).json({
            message: 'Not a specified app',
          });
        }

        await db
          .insert(AppsTable)
          .values({
            sanityId: _id,
            name,
          })
          .onConflictDoNothing({
            target: AppsTable.sanityId,
          });

        return res.status(200).json({
          message: 'App inserted into db',
        });
      } catch (error) {
        console.error('Sanity webhook app error', error);
        next(error);
      }
    },
  };
};
