import { Request, Response, NextFunction } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

class PaymentController {
  public makePayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // Make payment
    }
  );
}
