import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function checkPermission(reqUser: any, resUserId: any, res: Response) {
  if (reqUser.role === 'admin') return;
  if (reqUser.userId === resUserId.toString()) return;
  return res.status(StatusCodes.FORBIDDEN).json({
    message: 'You are not authorized to perform this action',
  });
}
