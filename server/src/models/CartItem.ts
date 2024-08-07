import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem extends Document {
  name: string;
  image: string;
  price: number;
  amount: number;
  product: mongoose.Schema.Types.ObjectId;
}

const CartItemSchema: Schema = new Schema(
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

export default mongoose.model<ICartItem>('CartItem', CartItemSchema);
