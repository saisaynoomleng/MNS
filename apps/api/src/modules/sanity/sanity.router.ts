import { Router } from 'express';
import { sanityController } from './sanity.controller.js';
import { ValidateBody } from '../../middlewares/validations.js';
import { SanityAppWebhookSchema } from '@mns/utils';

const router = Router();
const controller = sanityController();

router.post(
  '/apps',
  ValidateBody(SanityAppWebhookSchema),
  controller.createApp,
);

// router.post('/subscriptions');

export default router;
