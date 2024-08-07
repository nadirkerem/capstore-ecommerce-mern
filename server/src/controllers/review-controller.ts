import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Product from '../models/Product';
import Review from '../models/Review';
import { checkPermission } from '../utils/permission';

export async function getAllReviews(
  req: Request | any,
  res: Response
): Promise<void> {
  const reviews = await Review.find({})
    .populate({
      path: 'user',
      select: 'name',
    })
    .populate({
      path: 'product',
      select: 'name company price',
    });

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
  const review = await Review.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name',
    })
    .populate({
      path: 'product',
      select: 'name company price',
    });

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

  req.body.rating = req.body.rating || review.rating;
  req.body.title = req.body.title || review.title;
  req.body.comment = req.body.comment || review.comment;

  await review.save();

  res.status(StatusCodes.OK).json({ review });
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

  await review.deleteOne();

  res.status(StatusCodes.OK).json({ message: 'Review deleted successfully' });
}

export async function getSingleProductReviews(
  req: Request,
  res: Response
): Promise<void> {
  const reviews = await Review.find({ product: req.params.id });

  if (!reviews) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'No reviews found' });
    return;
  }

  res.status(StatusCodes.OK).json({ reviews });
}
