import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/User';

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body;

  const isUsernameTaken = await User.findOne({ username });

  if (isUsernameTaken) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Username is already taken');
  }

  const isEmailTaken = await User.findOne({ email });

  if (isEmailTaken) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Email is already taken');
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
