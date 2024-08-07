import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  tax: number;
  shippingFee: number;
  subtotal: number;
  total: number;
  items: [];
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
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    items: [],
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
      required: true,
    },
    status: {
      type: String,
      enum: ['processing', 'failed', 'shipped', 'cancelled', 'delivered'],
      required: true,
      default: 'processing',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
