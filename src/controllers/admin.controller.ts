import { Request, Response, NextFunction } from 'express';
import Account from '~/database/models/account.model';
import EnterpriseInfo from '~/database/models/enterpriseInfo.model';
import CandidateInfo from '~/database/models/candidateInfo.model';
import AppError from '~/utils/appError';
import catchAsync from '../utils/catchAsync';
import _ from 'lodash';

class AdminController {
  public getEnterpriseAccountList = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const enterpriseAccounts = await Account.findAll({
        where: { role: 'enterprise' }
      });
      res.status(200).json({
        status: 'success',
        data: enterpriseAccounts
      });
    }
  );

  public getEnterpriseAccountDetail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.params;
      const enterpriseAccount = await Account.findOne({
        where: { username, role: 'enterprise' },
        include: [EnterpriseInfo]
      });
      if (!enterpriseAccount) {
        return next(new AppError('Enterprise account not found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: enterpriseAccount
      });
    }
  );

  public getCandidateAccountList = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const candidateAccounts = await Account.findAll({
        where: { role: 'candidate' }
      });
      res.status(200).json({
        status: 'success',
        data: candidateAccounts
      });
    }
  );

  public getCandidateAccountDetail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.params;
      const candidateAccount = await Account.findOne({
        where: { username, role: 'candidate' },
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
  public getUserList = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userList = await Account.findAll({
        where: {
          role: 'user',
          verified: false
        }
      });
      res.status(200).json({
        status: 'success',
        data: userList
      });
    }
  );

  public getUserInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.params;
      const userInfo = await Account.findOne({
        where: {
          username,
          role: 'user',
          verified: false
        }
      });
      if (!userInfo) {
        return next(new AppError('User info not found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: userInfo
      });
    }
  );

  public verifyUserAndAddRole = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.params;
      const { role } = req.body;
      const user = await Account.findOne({
        where: {
          username,
          role: 'user',
          verified: false
        }
      });
      if (!user) {
        return next(new AppError('User not found', 404));
      }
      if (role === user.role) {
        return next(new AppError('User already has this role', 400));
      }
      user.verified = true;
      user.role = role;
      await user.save();
      res.status(200).json({
        status: 'success',
        data: user
      });
    }
  );

  public deactivateAccount = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.params;
      const account = await Account.findOne({
        where: {
          username,
          active: true
        }
      });
      if (!account) {
        return next(new AppError('Account not found', 404));
      }
      account.active = false;
      await account.save();
      res.status(200).json({
        status: 'success',
        message: 'Account deactivated successfully!'
      });
    }
  );

  public activateAccount = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.params;
      const account = await Account.findOne({
        where: {
          username,
          active: false
        }
      });
      if (!account) {
        return next(new AppError('Account not found', 404));
      }
      account.active = true;
      await account.save();
      res.status(200).json({
        status: 'success',
        data: account
      });
    }
  );

  public updateCandidateInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.params;

      const updatesFields = _.toPairs(req.body);

      const candidateAccount = await Account.findOne({
        where: { username, role: 'candidate' },
        include: [CandidateInfo]
      });

      const info = candidateAccount?.candidateInfo || null;

      if (!info) {
        return next(
          new AppError(
            'Candidate account not found or no candidate info available',
            404
          )
        );
      }

      this.updateObjectAttributes(info, updatesFields);

      const updatedCandidate = await info.save();

      res.status(200).json({
        status: 'success',
        data: updatedCandidate
      });
    }
  );

  public updateEnterpriseInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.params;

      const updatesFields = _.toPairs(req.body);

      const enterpriseAccount = await Account.findOne({
        where: { username, role: 'enterprise' },
        include: [EnterpriseInfo]
      });

      const info = enterpriseAccount?.candidateInfo || null;

      if (!info) {
        return next(
          new AppError(
            'Enterprise account not found or no enterprise info available',
            404
          )
        );
      }

      this.updateObjectAttributes(info, updatesFields);

      const updatedEnterprise = await info.save();

      res.status(200).json({
        status: 'success',
        data: updatedEnterprise
      });
    }
  );

  private updateObjectAttributes = (obj: any, updates: any[]) => {
    for (const [key, value] of updates) {
      if (value !== undefined || value !== null) {
        obj[key] = value;
      }
    }
  };
}

export default new AdminController();
