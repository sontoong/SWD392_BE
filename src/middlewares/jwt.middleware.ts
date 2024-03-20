import { Request, Response, NextFunction } from 'express';
import catchAsync from '~/utils/catchAsync';
import AppError from '~/utils/appError';
import jwt from 'jsonwebtoken';
import Account from '~/database/models/account.model';
import { filterObject } from '~/utils/filterObject';
import { ALLOWED_JWT_FIELDS } from '~/utils/constant';

declare global {
  namespace Express {
    interface Request {
      userInfo?: AccountAttributes;
    }
  }
}

const allowedFields = ALLOWED_JWT_FIELDS;

export const protectRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if token exists
    const authorizationHeader = req.headers.authorization;
    let token;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
      token = authorizationHeader.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // Response if token is invalid
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // Verify token
    const decodedJWT = (await jwt.verify(token, process.env.JWT_SECRET!)) as {
      id: string;
    };

    // Check if user still exists
    const currentUser = await Account.findByPk(decodedJWT.id);

    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists!', 401)
      );
    }

    // Check if the user changed the password after the token was issued
    // if (currentUser.changedPasswordAfter(decodedJWT.iat)) {
    //   return next(
    //     new AppError(
    //       'User recently changed the password! Please log in again.',
    //       401
    //     )
    //   );
    // }

    // Grant access to the protected route
    const filteredUser = filterObject(currentUser, allowedFields);
    req.userInfo = filteredUser as AccountAttributes;
    next();
  }
);

export const restrictTo = (...roles: string[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Roles is an array ['admin', 'staff', 'customer']
    // req.user.role is 'user' passed from protectRoute middleware
    // Since protectRoute middleware is called before this middleware
    const currentUser = await Account.findByPk(req.userInfo!.accountId);
    if (!currentUser || !roles.includes(currentUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );
    }
    next();
  });
