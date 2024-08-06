import mongoose, { Schema, Document } from 'mongoose';

import Order from './Order';

interface IReview extends Document {
  rating: number;
  price: number;
  description: string;
  image: string;
  category: string;
  colors: string[];
  company: string;
  featured: boolean;
  stock: number;
  freeShipping: boolean;
  userRating: number;
  user: mongoose.Schema.Types.ObjectId;
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

export default mongoose.model<IReview>('Review', ReviewSchema);
