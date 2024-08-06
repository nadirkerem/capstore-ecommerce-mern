import { Router } from 'express';

import {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/review-controller';

import {
  permissionAuthenticator,
  userAuthenticator,
} from '../middlewares/authenticator';

const router: Router = Router();

router.route('/').get(getAllReviews).post(userAuthenticator, createReview);

router
  .route('/:id')
  .get(getSingleReview)
  .put(userAuthenticator, updateReview)
  .delete(userAuthenticator, deleteReview);

export default router;
