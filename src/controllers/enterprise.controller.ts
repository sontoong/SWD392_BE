import { Request, Response, NextFunction } from 'express';
import Account from '~/database/models/account.model';
import EnterpriseInfo from '~/database/models/enterpriseInfo.model';
import CandidateInfo from '~/database/models/candidateInfo.model';
import AppError from '~/utils/appError';
import catchAsync from '../utils/catchAsync';

class EnterpriseController {
  public searchCandidate = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, tagName } = req.params;
      const candidateAccount = await Account.findOne({
        where: { username, role: 'candidate', active: true },
        include: [CandidateInfo]
      });
      if (!candidateAccount) {
        return next(new AppError('Candidate account not found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: candidateAccount
      });
    }
  );
}
