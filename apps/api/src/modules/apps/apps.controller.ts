import type { Request, Response, NextFunction } from 'express';
import { appRepository } from './apps.repository.js';

export const appController = () => {
  const repository = appRepository();

  return {
    deleteFeatureRequest: async (
      req: Request<{ id: string }>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;

        await repository.deleteFeatureRequest(id);

        return res.status(200).json({
          message: 'Feature Request Deleted Successfully!',
        });
      } catch (error) {
        console.error(`Delete Feature Request Controller Error`, error);

        return next(error);
      }
    },
  };
};
