import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/user-controller';
import {
  permissionAuthenticator,
  userAuthenticator,
} from '../middlewares/authenticator';

const router = Router();

router
  .route('/')
  .get(userAuthenticator, permissionAuthenticator('admin'), getAllUsers);

router.route('/:id').get(userAuthenticator, getSingleUser);

router.route('/me').get(getCurrentUser);

router.route('/update').put(updateUser);

router.route('/update-password').put(updateUserPassword);

export default router;
