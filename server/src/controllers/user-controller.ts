import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import { attachCookies } from '../utils/jwt';
import { checkPermission } from '../utils/permission';
import mongoose from 'mongoose';

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  const users = await User.find({
    role: { $ne: 'admin' },
  }).select('-password');

  res.status(StatusCodes.OK).json({ users });
}

export async function getSingleUser(
  req: Request | any,
  res: Response
): Promise<void> {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user id' });
    return;
  }

  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    return;
  }

  const isDenied = checkPermission(req.user, user._id, res);

  if (isDenied) return;

  res.status(StatusCodes.OK).json(user);
}

export async function getCurrentUser(
  req: Request | any,
  res: Response
): Promise<void> {
  res.status(StatusCodes.OK).json({ user: req.user });
}

export async function updateUser(
  req: Request | any,
  res: Response
): Promise<void> {
  const { username, email } = req.body;

  if (!username && !email) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Username or email is required',
    });
    return;
  }

  const isAlreadyExist = await User.findOne({
    $or: [{ username }, { email }],
    _id: { $ne: req.user.userId },
  });

  if (isAlreadyExist) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Username or email is already in use',
    });
    return;
  }

  const user = await User.findByIdAndUpdate(
    req.user.userId,
    { username, email },
    { new: true, runValidators: true }
  );

  const tokenUser = {
    userId: user!._id,
    username: user!.username,
    email: user!.email,
    role: user!.role,
  };

  attachCookies({ res, tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
}

export async function updateUserPassword(
  req: Request | any,
  res: Response
): Promise<void> {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Current password and new password are required',
    });
    return;
  }

  const user = (await User.findById(req.user.userId))!;

  const isPasswordValid = await user.comparePassword(currentPassword);

  if (!isPasswordValid) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid password' });
    return;
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ message: 'Password updated' });
}
