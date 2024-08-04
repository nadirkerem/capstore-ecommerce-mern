import jwt, { JwtPayload } from 'jsonwebtoken';

export function createJWT({ payload }: { payload: object }): string {
  if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
    throw new Error('JWT_SECRET and JWT_LIFETIME must be provided');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

export function verifyJWT({ token }: { token: string }): string | JwtPayload {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be provided');
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error: any) {
    throw new Error('Invalid or expired token');
  }
}
