import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';

export default async function authenticator(
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
