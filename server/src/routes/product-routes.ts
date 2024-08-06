import { Router } from 'express';

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from '../controllers/product-controller';

import {
  permissionAuthenticator,
  userAuthenticator,
} from '../middlewares/authenticator';

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

router
  .route('/:id/upload-image')
  .post(userAuthenticator, permissionAuthenticator('admin'), uploadImage);

export default router;
