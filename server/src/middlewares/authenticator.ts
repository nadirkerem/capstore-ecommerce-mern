import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';

export async function userAuthenticator(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies.token;

  if (!token) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication failed.' });
    return;
  }

  try {
    const payload = verifyJWT({ token });
    req.user = payload;
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication failed.' });
    return;
  }
}

export function permissionAuthenticator(...roles: string[]) {
  return (req: Request | any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Permission denied.' });
      return;
    }
    next();
  };
}
