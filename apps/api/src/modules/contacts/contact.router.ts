import { Router } from 'express';
import { ContactController } from './contact.controller.js';
import { ValidateBody, ValidateParams } from '../../middlewares/validations.js';
import { ContactUsFormSchema } from '@mns/utils';
import { requireAdmin } from '../../middlewares/requireAdmin.js';
import { IdParamsSchema } from '../../lib/types.js';

const router = Router();
const controller = ContactController();

router.get('/', requireAdmin, controller.getAll);
router.get(
  '/:id',
  requireAdmin,
  ValidateParams(IdParamsSchema),
  controller.getById,
);

router.post('/', ValidateBody(ContactUsFormSchema), controller.create);

export default router;
