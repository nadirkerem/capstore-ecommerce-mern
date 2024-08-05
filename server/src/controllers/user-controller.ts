import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  const users = await User.find({
    role: { $ne: 'admin' },
  }).select('-password');

  if (!users) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'No users found' });
    return;
  }

  res.status(StatusCodes.OK).json({ users });
}

export async function getSingleUser(
  req: Request,
  res: Response
): Promise<void> {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    return;
  }

  res.status(StatusCodes.OK).json(user);
}

export async function getCurrentUser(
  req: Request,
  res: Response
): Promise<void> {}

export async function updateUser(req: Request, res: Response): Promise<void> {
  res.json({ message: 'updateUser' });
}

export async function updateUserPassword(
  req: Request,
  res: Response
): Promise<void> {
  res.json({ message: 'updateUserPassword' });
}
