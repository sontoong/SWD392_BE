import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config({ path: '.env' });

import Account from '~/database/models/account.model';

import catchAsync from '../utils/catchAsync';
import AppError from '~/utils/appError';
import { filterObject } from '~/utils/filterObject';
import sendEmail from '~/utils/sendEmail';
import { ALLOWED_ACCOUNT_FIELDS } from '~/utils/constant';

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
    const allowedFields = ALLOWED_ACCOUNT_FIELDS;
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
      const { username, email, password, phone, passwordConfirm, role } =
        req.body;

      if (password !== passwordConfirm) {
        return next(new AppError('Passwords do not match!', 400));
      }

      const newUser = await Account.create({
        username: username,
        email: email,
        password: password,
        phone: phone,
        role: role
      });
      this.createSendToken(newUser, 201, res);
    }
  );

  public login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      // Check if username and password inputted
      if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
      }
      // Check if user exists and password is correct

      const user = await Account.findOne({ where: { email } });

      if (!user || !(await user.verifyPassword(password, user.password!))) {
        return next(new AppError('Incorrect email or password!', 401));
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

  public currentUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.userInfo as Account;
      this.createSendToken(user, 200, res);
    }
  );

  public forgotPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userEmail = req.body.email;
      const user = await Account.findOne({ where: { email: userEmail } });
      if (!user) {
        return next(new AppError('There is no user with email address.', 404));
      }

      const resetToken = user.createPasswordResetToken();
      await user.save({ validate: false });

      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/reset-password/${resetToken}`;

      const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

      try {
        await sendEmail({
          email: user.email,
          subject: 'Your password reset token (valid for 10 min)',
          message
        });
        res.status(200).json({
          status: 'success',
          message: 'Token sent to email!'
        });
      } catch (err) {
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save({ validate: false });

        return next(
          new AppError(
            'There was an error sending the email. Try again later!',
            500
          )
        );
      }
    }
  );

  public resetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const resetPasswordToken = req.params.token;

      const hashedResetPasswordToken = crypto
        .createHash('sha256')
        .update(resetPasswordToken)
        .digest('hex');

      const user = await Account.findOne({
        where: {
          passwordResetToken: hashedResetPasswordToken,
          passwordResetExpires: { $gt: Date.now() }
        }
      });
      if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
      }

      const { password, passwordConfirm } = req.body;
      user.password = password;
      if (password !== passwordConfirm) {
        return next(new AppError('Passwords do not match!', 400));
      }

      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      await user.save({ validate: true });

      this.createSendToken(user, 200, res);
      next();
    }
  );

  public changePassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await Account.findByPk(req.userInfo?.accountId);
      if (!user) {
        return next(new AppError('User not found', 404));
      }
      if (
        !(await user.verifyPassword(req.body.passwordCurrent, user.password!))
      ) {
        return next(new AppError('Your current password is wrong.', 401));
      }

      const { newPassword, newPasswordConfirm } = req.body;
      user.password = newPassword;
      if (newPassword !== newPasswordConfirm) {
        return next(new AppError('Passwords do not match!', 400));
      }
      await user.save();
      this.createSendToken(user, 200, res);
    }
  );
}

export default new AuthController();
