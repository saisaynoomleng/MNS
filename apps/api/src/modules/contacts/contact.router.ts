import { Router } from 'express';
import { ContactController } from './contact.controller.js';
import { ValidateBody } from '../../middlewares/validations.js';
import { ContactUsFormSchema } from '@mns/utils';

const router = Router();
const controller = ContactController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', ValidateBody(ContactUsFormSchema), controller.create);

export default router;
