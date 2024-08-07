import mongoose, { Schema, Document, Model } from 'mongoose';

import Order from './Order';

interface IReview extends Document {
  rating: number;
  title: string;
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
}

interface IReviewModel extends Model<IReview> {
  calculateUserRating(productId: string): Promise<void>;
}

const ReviewSchema: Schema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must not be more than 5'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title must not be more than 100 characters'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      maxlength: [500, 'Comment must not be more than 500 characters'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

ReviewSchema.statics.calculateUserRating = async function (
  productId: string
) {};

ReviewSchema.post<IReview>('save', async function () {
  const review = this as IReview & { constructor: IReviewModel };
  await review.constructor.calculateUserRating(this.product.toString());
});

ReviewSchema.post<IReview>('deleteOne', async function () {
  const review = this as IReview & { constructor: IReviewModel };
  await review.constructor.calculateUserRating(this.product.toString());
});

export default mongoose.model<IReview, IReviewModel>('Review', ReviewSchema);
