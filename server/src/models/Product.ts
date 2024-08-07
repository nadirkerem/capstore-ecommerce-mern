import mongoose, { Schema, Document } from 'mongoose';

import Order from './Order';

interface IProduct extends Document {
  name: string;
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

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Product name is required'],
      maxlength: [100, 'Product name must be at most 100 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      default: 0,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description must be at most 1000 characters long'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      maxlength: [50, 'Category must be at most 50 characters long'],
    },
    colors: {
      type: [String],
      required: [true, 'Colors are required'],
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      default: 10,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    userRating: {
      type: Number,
      min: [0, 'Rating must be between 0 and 5'],
      max: [5, 'Rating must be between 0 and 5'],
      index: true,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await this.model('Review').deleteMany({ product: this._id });
  }
);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

export default mongoose.model<IProduct>('Product', ProductSchema);
