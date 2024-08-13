import { Request, Response } from 'express';
import Product from '../models/Product';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

export async function getAllProducts(
  req: Request | any,
  res: Response
): Promise<void> {
  const { page = 1, limit = 6, landing } = req.query;

  let query = {};

  if (landing) {
    query = { landing: true };
  }

  const products = await Product.find(query)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const count = await Product.countDocuments(query);

  const meta = {
    totalProducts: count,
    totalPages: Math.ceil(count / Number(limit)),
    totalProductsInPage: products.length,
    currentPage: Number(page),
    productsPerPage: Number(limit),
  };

  res.status(StatusCodes.OK).json({ products, meta });
}

export async function getSingleProduct(
  req: Request,
  res: Response
): Promise<void> {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid product id' });
    return;
  }

  const product = await Product.findById(req.params.id).populate('reviews');

  if (!product) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    return;
  }

  res.status(StatusCodes.OK).json({ product });
}

export async function createProduct(
  req: Request | any,
  res: Response
): Promise<void> {
  req.body.user = req.user.userId;

  if (Array.isArray(req.body)) {
    req.body.forEach((product: any) => {
      product.user = req.user.userId;
    });
    const products = await Product.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ products });
    return;
  }

  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
}

export async function updateProduct(
  req: Request,
  res: Response
): Promise<void> {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid product id' });
    return;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    return;
  }

  res.status(StatusCodes.OK).json({ product });
}

export async function deleteProduct(
  req: Request,
  res: Response
): Promise<void> {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid product id' });
    return;
  }

  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    return;
  }

  await product.deleteOne();

  res.status(StatusCodes.OK).json({ message: 'Product deleted' });
}
