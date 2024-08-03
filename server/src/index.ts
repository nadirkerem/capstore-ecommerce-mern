import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db';

import errorHandler from './middlewares/error-handler';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
