import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
// @ts-ignore
import xss from 'xss-clean';
import cors from 'cors';

import connectDB from './config/db';

import errorHandler from './middlewares/error-handler';

import authRoutes from './routes/auth-routes';
import orderRoutes from './routes/order-routes';
import productRoutes from './routes/product-routes';
import userRoutes from './routes/user-routes';
import reviewRoutes from './routes/review-routes';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(
  cors({
    origin: 'https://mern-ecommerce-chi-lemon.vercel.app/',
    credentials: true,
  })
);

app.options(
  '*',
  cors({
    origin: 'https://mern-ecommerce-chi-lemon.vercel.app/',
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);
app.use(mongoSanitize());
app.use(xss());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

app.get('/api', (req: Request, res: Response) => {
  res.send('Welcome to Ecommerce API');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is running...');
});
