import { Request, Response } from 'express';
import Product from '../models/Product';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

export async function getAllProducts(
  req: Request | any,
  res: Response
): Promise<void> {
  const {
    page = 1,
    limit = 6,
    landing,
    search,
    category,
    brand,
    maxPrice,
    freeShipping,
    sort,
  } = req.query;

  let query: any = {};

  if (landing) {
    query = { landing: true };
  }

  if (search && search !== '') {
    const searchRegex = new RegExp(search, 'i');
    query.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
      { brand: searchRegex },
    ];
  }

  if (category && category !== 'All') {
    query.category = category;
  }

  if (brand && brand !== 'All') {
    query.brand = brand;
  }

  if (maxPrice) {
    query.price = { $lte: Number(maxPrice) };
  }

  if (freeShipping) {
    query.freeShipping = true;
  }

  let sortOption: any = {};
  switch (sort) {
    case 'newest':
      sortOption.createdAt = -1;
      break;
    case 'oldest':
      sortOption.createdAt = 1;
      break;
    case 'rating':
      sortOption.rating = -1;
      break;
    case 'price-low-to-high':
      sortOption.price = 1;
      break;
    case 'price-high-to-low':
      sortOption.price = -1;
      break;
    case 'a-z':
      sortOption.name = 1;
      break;
    case 'z-a':
      sortOption.name = -1;
      break;

    default:
      sortOption.createdAt = -1;
  }

  const count = await Product.countDocuments(query);

  const totalPages = Math.ceil(count / Number(limit));

  const categories = await Product.distinct('category');
  const brands = await Product.distinct('brand');

  if (count === 0) {
    res
      .status(StatusCodes.OK)
      .json({ products: [], meta: { totalProducts: 0 }, categories, brands });
    return;
  }

  if (Number(page) > totalPages) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Invalid page number. There are only ${totalPages} pages available.`,
    });
    return;
  }

  const products = await Product.find(query)
    .sort(sortOption)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const meta = {
    totalProducts: count,
    totalPages,
    totalProductsInPage: products.length,
    currentPage: Number(page),
    productsPerPage: Math.min(products.length, Number(limit)),
  };

  res.status(StatusCodes.OK).json({ products, meta, categories, brands });
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
