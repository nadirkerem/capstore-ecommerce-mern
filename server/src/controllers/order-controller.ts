import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Product from '../models/Product';
import Order from '../models/Order';
import { checkPermission } from '../utils/permission';
import mongoose from 'mongoose';

async function mockStripeAPI({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) {
  const client_secret = 'mock_secret';
  return { client_secret, amount };
}

export async function getAllOrders(req: Request, res: Response) {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

export async function getSingleOrder(req: Request | any, res: Response) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid order id' });
    return;
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  const isDenied = checkPermission(req.user, order.user, res);

  if (isDenied) return;

  res.status(StatusCodes.OK).json(order);
}

export async function getCurrentUserOrders(req: Request | any, res: Response) {
  const orders = await Order.find({ user: req.user.userId });

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

export async function createOrder(req: Request | any, res: Response) {
  const { items: cartItems, tax, shippingFee, shippingAddress } = req.body;

  if (!cartItems || cartItems.length < 1) {
    res.status(400).json({ message: 'Items are required' });
    return;
  }

  if (!tax || !shippingFee) {
    res.status(400).json({ message: 'Tax and shipping fee are required' });
    return;
  }

  if (
    !shippingAddress ||
    !shippingAddress.street ||
    !shippingAddress.city ||
    !shippingAddress.state ||
    !shippingAddress.postalCode ||
    !shippingAddress.country
  ) {
    res.status(400).json({ message: 'Complete shipping address is required' });
    return;
  }

  let orderItems = [];
  let subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const product = await Product.findById(cartItems[i].product);

    if (!product) {
      res.status(400).json({ message: 'Product not found' });
      return;
    }

    const { name, price, image, _id } = product;

    const orderItem = {
      product: _id,
      name,
      price: Math.round(price * 100),
      image,
      amount: cartItems[i].amount,
    };

    orderItems.push(orderItem);

    subTotal += orderItem.price * orderItem.amount;
  }

  const total = tax + shippingFee + subTotal;

  const paymentIntent = await mockStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    user: req.user.userId,
    orderItems,
    tax,
    shippingFee,
    subTotal,
    total,
    clientSecret: paymentIntent.client_secret,
    shippingAddress,
  });

  if (!order) {
    res.status(400).json({ message: 'Order could not be created' });
    return;
  }

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
}

export async function updateOrder(req: Request | any, res: Response) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid order id' });
    return;
  }

  const { paymentIntentId, status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  const isDenied = checkPermission(req.user, order.user, res);

  if (isDenied) return;

  order.paymentIntentId = paymentIntentId;
  order.status = status;

  await order.save();

  res.status(StatusCodes.OK).json({ order });
}

export async function deleteOrder(req: Request, res: Response) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid order id' });
    return;
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  await order.deleteOne();

  res.status(StatusCodes.OK).json({ message: 'Order removed' });
}
