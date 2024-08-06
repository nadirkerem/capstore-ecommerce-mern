import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Product from '../models/Product';
import Review from '../models/Review';
import { checkPermission } from '../utils/permission';

export async function getAllReviews(
  req: Request | any,
  res: Response
): Promise<void> {
  const reviews = await Review.find({});

  if (!reviews) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'No reviews found' });
    return;
  }

  res.status(StatusCodes.OK).json({ reviews });
}

export async function getSingleReview(
  req: Request,
  res: Response
): Promise<void> {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found' });
    return;
  }

  res.status(StatusCodes.OK).json({ review });
}

export async function createReview(
  req: Request | any,
  res: Response
): Promise<void> {
  const { product } = req.body;

  const isProductExist = await Product.findById(product);

  if (!isProductExist) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Product not found' });
    return;
  }

  const isReviewExist = await Review.findOne({
    user: req.user.userId,
    product,
  });

  if (isReviewExist) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Review already exists' });
    return;
  }

  req.body.user = req.user.userId;

  const review = await Review.create(req.body);

  if (!review) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Review not created' });
    return;
  }

  res.status(StatusCodes.CREATED).json({ review });
}

export async function updateReview(
  req: Request | any,
  res: Response
): Promise<void> {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found' });
    return;
  }

  const isDenied = checkPermission(req.user, review.user, res);

  if (isDenied) return;

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedReview) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Review not updated' });
    return;
  }

  res.status(StatusCodes.OK).json({ updatedReview });
}

export async function deleteReview(
  req: Request | any,
  res: Response
): Promise<void> {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found' });
    return;
  }

  const isDenied = checkPermission(req.user, review.user, res);

  if (isDenied) return;

  res.status(StatusCodes.OK).json({ message: 'Review deleted successfully' });
}
