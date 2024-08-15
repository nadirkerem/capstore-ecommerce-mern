import mongoose, { Schema, Document } from 'mongoose';

interface IShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface IOrderItem {
  cartID: string;
  name: string;
  image: string;
  brand: string;
  color: string;
  price: number;
  amount: number;
  product: mongoose.Schema.Types.ObjectId; // Updated to represent the product ID
}

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
  shippingAddress: IShippingAddress;
  numberOfItems: number;
}

const ShippingAddressSchema: Schema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const OrderItemSchema: Schema = new Schema(
  {
    cartID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
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
      type: mongoose.Schema.Types.ObjectId, // Refers to the Product ID
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    numberOfItems: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
