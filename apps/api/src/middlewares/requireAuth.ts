import type { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        message: 'Unauthorized!',
      });
    }

    req.user = session.user;

    return next();
  } catch (error) {
    console.error('Auth Validation error');

    return next(error);
  }
};
