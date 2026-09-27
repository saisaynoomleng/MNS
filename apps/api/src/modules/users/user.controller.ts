import type { Request, Response, NextFunction } from 'express';
import { type SelectUserTable } from '../../db/index.js';
import type {
  FeatureRequestFormInput,
  UpdateUserAddressFormInput,
} from '@mns/utils';
import { userRepository } from './user.repository.js';

export const userController = () => {
  const repository = userRepository();

  return {
    getAll: () => {},

    getMe: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await repository.findById(req.user.id);

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

    updateUserInfo: async (
      req: Request<{}, {}, SelectUserTable>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { name, companyName, position, phone } = req.body;
        const { id } = req.user;

        await repository.updateUserInfo({
          id,
          name,
          companyName: companyName ?? '',
          position: position ?? '',
          phone: phone ?? '',
        });

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
        const { sanityAppId, body } = req.body;
        const { id: userId } = req.user;

        const app = await repository.findApp(sanityAppId);

        if (!app) {
          return res.status(404).json({
            message: 'App not found',
          });
        }

        await repository.requestFeature({ userId, appId: app.id, body });

        return res.status(201).json({
          message: 'Feature Requested!',
        });
      } catch (error) {
        console.error('request feature api error', error);
        return next(error);
      }
    },

    getFeatureRequestHistory: async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.user;

        const histories = await repository.findFeatureRequestHistory(id);

        return res.status(200).json(histories);
      } catch (error) {
        return next(error);
      }
    },

    updateAddress: async (
      req: Request<{}, {}, UpdateUserAddressFormInput>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id: userId } = req.user;
        const { address1, address2, city, zip, state, country } = req.body;

        console.log('UPDATE ADDRESS', {
          userId,
          body: req.body,
        });

        await repository.updateAddress({
          userId,
          address1,
          address2,
          city,
          zip,
          state,
          country,
        });

        return res.status(200).json({
          message: 'Address updated!',
        });
      } catch (error) {
        console.error(`Update Address API error`, error);

        return next(error);
      }
    },
  };
};
