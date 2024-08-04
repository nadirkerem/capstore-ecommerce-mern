import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/User';
import validator from 'validator';

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Username, email, and password are required' });
  }

  if (password.length < 6) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Password must be at least 6 characters long' });
  }

  if (username.length < 3 || username.length > 50) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Username must be between 3 and 50 characters long' });
  }

  if (!validator.isEmail(email)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid email format' });
  }

  const isUsernameTaken = await User.findOne({ username });

  if (isUsernameTaken) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Username is taken' });
  }

  const isEmailTaken = await User.findOne({ email });

  if (isEmailTaken) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email is taken' });
  }

  const user = await User.create({ username, email, password });
  res.status(StatusCodes.CREATED).json({ user });
}

export async function login(req: Request, res: Response): Promise<void> {
  res.send('Login route');
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.send('Logout route');
}
