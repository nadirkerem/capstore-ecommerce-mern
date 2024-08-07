import { Router } from 'express';

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product-controller';

import {
  permissionAuthenticator,
  userAuthenticator,
} from '../middlewares/authenticator';
import { getSingleProductReviews } from '../controllers/review-controller';

const router: Router = Router();

router
  .route('/')
  .get(getAllProducts)
  .post(userAuthenticator, permissionAuthenticator('admin'), createProduct);

router
  .route('/:id')
  .get(getSingleProduct)
  .put(userAuthenticator, permissionAuthenticator('admin'), updateProduct)
  .delete(userAuthenticator, permissionAuthenticator('admin'), deleteProduct);

router.route('/:id/reviews').get(getSingleProductReviews);

export default router;
