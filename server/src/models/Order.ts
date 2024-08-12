import mongoose, { Schema, Document } from 'mongoose';

import { IOrderItem, OrderItemSchema } from './OrderItem';

interface IOrder extends Document {
  tax: number;
  shippingFee: number;
  subTotal: number;
  total: number;
  orderItems: IOrderItem[];
  user: mongoose.Schema.Types.ObjectId;
  clientSecret: string;
  paymentIntentId: string;
  status: string;
}

const OrderSchema: Schema = new Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [OrderItemSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        'processing',
        'failed',
        'paid',
        'packed',
        'shipped',
        'completed',
        'cancelled',
        'returned',
        'refunded',
      ],
      required: true,
      default: 'processing',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
