import { Router } from 'express';
import { ValidateBody, ValidateParams } from '../../middlewares/validations.js';
import * as z from 'zod';
import { userController } from './user.controller.js';
import {
  FeatureRequestFormSchema,
  UpdateUserDetailFormSchema,
} from '@mns/utils';
import { requireAuth } from '../../middlewares/requireAuth.js';

const UserId = z.object({
  id: z.uuid(),
});

const router = Router();
const controller = userController();

router.use(requireAuth);

router.get('/', controller.getAll);

router.get('/me', controller.getMe);

router.get('/request-feature-history', controller.getFeatureRequestHistory);

router.post(
  '/request-feature',
  ValidateBody(FeatureRequestFormSchema),
  controller.requestFeature,
);

router.patch(
  '/',
  ValidateBody(UpdateUserDetailFormSchema),
  controller.updateUserInfo,
);

export default router;
