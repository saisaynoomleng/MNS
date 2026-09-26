import { Router } from 'express';
import { ValidateBody, ValidateParams } from '../../middlewares/validations.js';
import * as z from 'zod';
import { userController } from './user.controller.js';
import { UpdateUserDetailFormSchema } from '@mns/utils';

const UserId = z.object({
  id: z.uuid(),
});

const router = Router();
const controller = userController();

router.get('/', controller.getAll);
router.get('/:id', ValidateParams(UserId), controller.getById);
router.post(
  '/:id',
  ValidateParams(UserId),
  ValidateBody(UpdateUserDetailFormSchema),
  controller.edit,
);

export default router;
