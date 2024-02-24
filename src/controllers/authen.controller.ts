import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import Account from '~/database/models/account.model';
import AccountAttributes from '~/type';

import catchAsync from '../utils/catchAsync';
import AppError from '~/utils/appError';
import { filterObject } from '~/utils/filterObject';

class AuthController {
  private signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

  private createSendToken = (
    user: AccountAttributes,
    statusCode: number,
    res: Response
  ) => {
    const token = this.signToken(user.accountId!.toString());
    const cookieOptions = {
      // convert to milliseconds
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production')
      (cookieOptions as any).secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove fields that are not allowed to be sent to client
    const allowedFields = ['username', 'email', 'image', 'role', 'phone'];
    const userResponse = filterObject(user, allowedFields);

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user: userResponse
      }
    });
  };

  public signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, email, password, phone, passwordConfirm } = req.body;

      if (password !== passwordConfirm) {
        return next(new AppError('Passwords do not match!', 400));
      }

      const newUser = await Account.create({
        username: username,
        email: email,
        password: password,
        phone: phone,
        role: 'candidate'
      });
      this.createSendToken(newUser, 201, res);
    }
  );

  public login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;
      // Check if username and password inputted
      if (!username || !password) {
        return next(new AppError('Please provide username and password!', 400));
      }
      // Check if user exists and password is correct

      const user = await Account.findOne({ where: { username } });

      console.log(user);

      if (!user || !(await user.verifyPassword(password, user.password!))) {
        return next(new AppError('Incorrect username or password!', 401));
      }

      this.createSendToken(user, 200, res);
    }
  );
  public logout = (req: Request, res: Response) => {
    res.cookie('jwt', 'logged-out', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
  };
}

export default new AuthController();
