import { Request, Response, NextFunction } from 'express';
import Account from '~/database/models/account.model';
import EnterpriseInfo from '~/database/models/enterpriseInfo.model';
import CandidateInfo from '~/database/models/candidateInfo.model';
import Rating from '~/database/models/rating.model';
import AppError from '~/utils/appError';
import catchAsync from '../utils/catchAsync';

class RatingController {
  public createRating = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        enterpriseUsername,
        candidateUsername,
        quality,
        price,
        time,
        responsibility,
        communication,
        comment
      } = req.body;

      let overallRating =
        (quality + price + time + responsibility + communication) / 5;
      const rating = await Rating.create({
        enterpriseUsername,
        candidateUsername,
        quality,
        price,
        time,
        responsibility,
        communication,
        overallRating,
        comment
      });

      res.status(201).json({
        status: 'success',
        data: {
          rating
        }
      });
    }
  );

  // public getRating = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const { candidateUsername } = req.params;
  //     const rating = await Rating.findAll({
  //       where: { candidateUsername },
  //       include: [
  //         {
  //           model: Account,
  //           as: 'enterprise',
  //           include: [EnterpriseInfo]
  //         }
  //       ]
  //     });

  //     if (!rating) {
  //       return next(new AppError('Rating not found', 404));
  //     }

  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         rating
  //       }
  //     });
  //   }
  // );
}

export default new RatingController();
