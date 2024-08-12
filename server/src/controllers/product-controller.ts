import { Request, Response } from 'express';
import Product from '../models/Product';
import { StatusCodes } from 'http-status-codes';

export async function getAllProducts(
  req: Request | any,
  res: Response
): Promise<void> {
  const { landing } = req.query;

  const query = landing ? { landing } : {};

  const products = await Product.find(query);

  res.status(StatusCodes.OK).json({ products, count: products.length });
}

export async function getSingleProduct(
  req: Request,
  res: Response
): Promise<void> {
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
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    return;
  }

  await product.deleteOne();

  res.status(StatusCodes.OK).json({ message: 'Product deleted' });
}
