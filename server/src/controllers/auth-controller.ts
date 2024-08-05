import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';

import { attachCookies, createJWT } from '../utils/jwt';

import User from '../models/User';

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Username, email, and password are required' });
    return;
  }

  if (password.length < 6) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Password must be at least 6 characters long' });
    return;
  }

  if (username.length < 3 || username.length > 50) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Username must be between 3 and 50 characters long' });
    return;
  }

  if (!validator.isEmail(email)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Invalid email format' });
    return;
  }

  const isUsernameTaken = await User.findOne({ username });

  if (isUsernameTaken) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Username is taken' });
    return;
  }

  const isEmailTaken = await User.findOne({ email });

  if (isEmailTaken) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email is taken' });
    return;
  }

  const user = await User.create({ username, email, password });

  const tokenUser = {
    username: user.username,
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  attachCookies({ res, tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Email and password are required' });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid credentials' });
    return;
  }

  const tokenUser = {
    username: user.username,
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  attachCookies({ res, tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.send('Logout route');
}
