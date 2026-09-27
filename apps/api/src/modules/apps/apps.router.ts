import { Router } from 'express';
import { appController } from './apps.controller.js';
import { ValidateParams } from '../../middlewares/validations.js';
import * as z from 'zod';

const params = z.object({
  id: z.string(),
});

const router = Router();
const controller = appController();

router.delete(
  '/delete-feature-request/:id',
  ValidateParams(params),
  controller.deleteFeatureRequest,
);

export default router;
