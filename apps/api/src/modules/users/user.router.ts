import { Router } from 'express';
import { ValidateBody, ValidateParams } from '../../middlewares/validations.js';
import * as z from 'zod';
import { userController } from './user.controller.js';

const UserId = z.object({
  id: z.uuid(),
});

const router = Router();
const controller = userController();

router.get('/', controller.getAll);
router.get('/:id', ValidateParams(UserId), controller.getById);
router.post('/:id', controller.edit);

export default router;
