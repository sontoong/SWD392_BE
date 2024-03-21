import { Request, Response, NextFunction } from 'express';
import Account from '~/database/models/account.model';
import EnterpriseInfo from '~/database/models/enterpriseInfo.model';
import CandidateInfo from '~/database/models/candidateInfo.model';
import AppError from '~/utils/appError';
import catchAsync from '../utils/catchAsync';
import Post from '~/database/models/post.model';

class EnterpriseController {
  // Method to get enterprise info by account id
  public getEnterpriseInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const accountId = req.userInfo!.accountId;
      const enterpriseInfo = await EnterpriseInfo.findByPk(accountId);
      if (!enterpriseInfo) {
        return next(new AppError('Enterprise info not found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: enterpriseInfo
      });
    }
  );

  // Method to create Enterprise info
  public createEnterpriseInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        enterpriseName,
        dob,
        enterpriseNation,
        enterpriseVerificationDocuments,
        enterpriseVerificationType,
        enterpriseVerificationNumber,
        companyName,
        companySize,
        companyWebAddress,
        companyVideoAddress,
        companyDescription,
        companyVerificationDocuments,
        companyVerificationNumber,
        companyTaxCode,
        companyNation,
        companyAddress,
        companyEmail,
        companyPhone
      } = req.body;

      // if (!req.userInfo || !req.userInfo.verified) {
      //   return next(
      //     new AppError(
      //       'You are not verified. Please login or request verification from admin.',
      //       401
      //     )
      //   );
      // }

      const accountId = req.userInfo!.accountId;
      const enterpriseInfo = await EnterpriseInfo.create({
        accountId,
        enterpriseName,
        dob,
        enterpriseNation,
        enterpriseVerificationDocuments,
        enterpriseVerificationType,
        enterpriseVerificationNumber,
        companyName,
        companySize,
        companyWebAddress,
        companyVideoAddress,
        companyDescription,
        companyVerificationDocuments,
        companyVerificationNumber,
        companyTaxCode,
        companyNation,
        companyAddress,
        companyEmail,
        companyPhone
      });
      res.status(201).json({
        status: 'success',
        data: enterpriseInfo
      });
    }
  );

  // Method to delete enterprise info by account id
  public deleteEnterpriseInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const accountId = req.userInfo!.accountId;
      const deleted = await EnterpriseInfo.destroy({ where: { accountId } });
      if (deleted) {
        return res.status(204).json({
          status: 'success',
          message: 'Enterprise info deleted'
        });
      }
      throw new AppError('Enterprise info not found', 404);
    }
  );

  // Method to update enterprise info by account id
  public updateEnterpriseInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const accountId = req.userInfo!.accountId;

      const {
        enterpriseName,
        dob,
        enterpriseNation,
        enterpriseVerificationDocuments,
        enterpriseVerificationType,
        enterpriseVerificationNumber,
        companyName,
        companySize,
        companyWebAddress,
        companyVideoAddress,
        companyDescription,
        companyVerificationDocuments,
        companyVerificationNumber,
        companyTaxCode,
        companyNation,
        companyAddress,
        companyEmail,
        companyPhone
      } = req.body;

      const [updated] = await EnterpriseInfo.update(
        {
          enterpriseName,
          dob,
          enterpriseNation,
          enterpriseVerificationDocuments,
          enterpriseVerificationType,
          enterpriseVerificationNumber,
          companyName,
          companySize,
          companyWebAddress,
          companyVideoAddress,
          companyDescription,
          companyVerificationDocuments,
          companyVerificationNumber,
          companyTaxCode,
          companyNation,
          companyAddress,
          companyEmail,
          companyPhone
        },
        { where: { accountId } }
      );
      if (updated) {
        const updatedEnterpriseInfo = await EnterpriseInfo.findByPk(accountId);
        return res.json(updatedEnterpriseInfo);
      }
      throw new Error('Enterprise info not found');
    }
  );

  // Method to search candidate by username, tagName
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

  // Method to get candidate info by id
  public getCandidateInfoById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { candidateId } = req.params;
      const candidateInfo = await CandidateInfo.findByPk(candidateId);
      if (!candidateInfo) {
        return next(new AppError('Candidate info not found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: candidateInfo
      });
    }
  );

  // Method to invite candidate by candidateId, postId
  public inviteCandidate = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { candidateId } = req.params;
      const { postId } = req.body;
      const post = await Post.findByPk(postId);
      if (!post) {
        return next(new AppError('Post not found', 404));
      }
      const candidate = await CandidateInfo.findByPk(candidateId);
      if (!candidate) {
        return next(new AppError('Candidate not found', 404));
      }
      // Send invitation
      res.status(200).json({
        status: 'success',
        message: 'Invitation sent'
      });

      // TODO: add postId to candidate's application
    }
  );

  // Method to pay salary for candidate by candidateId, postId and salary
  public paySalary = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { candidateId, postId } = req.params;
      const { salary } = req.body;
      const post = await Post.findByPk(postId);
      if (!post) {
        return next(new AppError('Post not found', 404));
      }
      const candidate = await CandidateInfo.findByPk(candidateId);
      if (!candidate) {
        return next(new AppError('Candidate not found', 404));
      }
      // Pay salary
      res.status(200).json({
        status: 'success',
        message: 'Salary paid'
      });

      // TODO: add salary to candidate's account
    }
  );
}

export default new EnterpriseController();
