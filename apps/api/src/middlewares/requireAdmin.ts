import type { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';

export const requireAdmin = async (
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

    const role = session.user.role?.split(',').map((role) => role.trim());

    if (!role?.includes('admin')) {
      return res.status(401).json({
        message: 'Unauthorized!',
      });
    }

    req.user = session.user;

    return next();
  } catch (error) {
    console.error('Admin Auth validation error');

    return next(error);
  }
};
