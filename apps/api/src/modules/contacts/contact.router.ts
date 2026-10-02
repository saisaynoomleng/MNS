import { Router } from 'express';
import { ContactController } from './contact.controller.js';
import { ValidateBody } from '../../middlewares/validations.js';
import { ContactUsFormSchema } from '@mns/utils';
import { requireAdmin } from '../../middlewares/requireAdmin.js';

const router = Router();
const controller = ContactController();

router.get('/', requireAdmin, controller.getAll);
router.get('/:id', requireAdmin, controller.getById);

router.post('/', ValidateBody(ContactUsFormSchema), controller.create);

export default router;
