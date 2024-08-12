import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem extends Document {
  name: string;
  image: string;
  price: number;
  amount: number;
  product: mongoose.Schema.Types.ObjectId;
}

export const OrderItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
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
