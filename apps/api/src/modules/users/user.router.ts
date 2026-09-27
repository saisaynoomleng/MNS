import { Router } from 'express';
import { ValidateBody, ValidateParams } from '../../middlewares/validations.js';
import * as z from 'zod';
import { userController } from './user.controller.js';
import {
  FeatureRequestFormSchema,
  UpdateUserDetailFormSchema,
} from '@mns/utils';

const UserId = z.object({
  id: z.uuid(),
});

const router = Router();
const controller = userController();

router.get('/', controller.getAll);

router.get(
  '/:id/feature-requests',
  ValidateParams(UserId),
  controller.getFeatureRequestHistory,
);

router.get('/:id', ValidateParams(UserId), controller.getById);

router.post(
  '/:id/request-feature',
  ValidateParams(UserId),
  ValidateBody(FeatureRequestFormSchema),
  controller.requestFeature,
);

router.patch(
  '/:id',
  ValidateParams(UserId),
  ValidateBody(UpdateUserDetailFormSchema),
  controller.edit,
);

export default router;
