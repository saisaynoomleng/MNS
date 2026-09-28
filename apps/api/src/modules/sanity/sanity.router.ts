import { Router } from 'express';
import { sanityController } from './sanity.controller.js';
import { ValidateBody } from '../../middlewares/validations.js';
import { SanityAppWebhookSchema } from '@mns/utils';
import * as z from 'zod';

const SanitySubscriptionWebhookSchema = z.object({
  sanityId: z.string(),
  name: z.string(),
  pricePerMonth: z.coerce.number(),
  _type: z.literal('subscription'),
});

const router = Router();
const controller = sanityController();

router.post(
  '/apps',
  ValidateBody(SanityAppWebhookSchema),
  controller.createApp,
);

router.post(
  '/subscriptions',
  ValidateBody(SanitySubscriptionWebhookSchema),
  controller.createSubscription,
);

export default router;
