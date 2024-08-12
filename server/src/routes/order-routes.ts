import { Router } from 'express';
const router: Router = Router();

import {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/order-controller';

import {
  permissionAuthenticator,
  userAuthenticator,
} from '../middlewares/authenticator';

router
  .route('/')
  .get(userAuthenticator, permissionAuthenticator('admin'), getAllOrders)
  .post(userAuthenticator, createOrder);

router
  .route('/:id')
  .get(userAuthenticator, getSingleOrder)
  .put(userAuthenticator, permissionAuthenticator('admin'), updateOrder)
  .delete(userAuthenticator, permissionAuthenticator('admin'), deleteOrder);

router.route('/my-orders').get(userAuthenticator, getCurrentUserOrders);

export default router;
