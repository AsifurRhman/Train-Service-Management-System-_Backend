import express from 'express';
import { adminMiddleware } from '../../middleware/auth.js';
import validateRequest from '../../middleware/validateRequest.js';
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
} from './user.controller.js';
import {
  loginValidationSchema,
  registerUserValidationSchema,
  updateUserValidationSchema,
} from './user.validation.js';

const router = express.Router();

router.post(
  '/register',
  validateRequest(registerUserValidationSchema),
  registerUser,
);
router.post('/login', validateRequest(loginValidationSchema), loginUser);


router.put(
  '/update/:userId',
  validateRequest(updateUserValidationSchema),
  updateUser,
);

router.delete('/delete/:userId',adminMiddleware('admin'), deleteUser);


export default router;
