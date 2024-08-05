import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/user-controller';
import authenticator from '../middlewares/authenticator';

const router = Router();

router.route('/').get(authenticator, getAllUsers);

router.route('/:id').get(authenticator, getSingleUser);

router.route('/me').get(getCurrentUser);

router.route('/update').put(updateUser);

router.route('/update-password').put(updateUserPassword);

export default router;
