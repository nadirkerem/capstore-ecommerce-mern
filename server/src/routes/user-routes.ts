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

router.route('/me').get(userAuthenticator, getCurrentUser);

router.route('/update').put(userAuthenticator, updateUser);

router.route('/update-password').put(userAuthenticator, updateUserPassword);

router.route('/:id').get(userAuthenticator, getSingleUser);

export default router;
