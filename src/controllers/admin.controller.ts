import { Request, Response, NextFunction } from 'express';
import Account from '~/database/models/account.model';
import EnterpriseInfo from '~/database/models/enterpriseInfo.model';
import CandidateInfo from '~/database/models/candidateInfo.model';
import AppError from '~/utils/appError';
import catchAsync from '../utils/catchAsync';
import _ from 'lodash';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import Language from '~/database/models/language.model';
import JobTitle from '~/database/models/jobTitle.model';
import Skill from '~/database/models/skill.model';
import Rating from '~/database/models/rating.model';

interface Pagination {
  page: number;
  limit: number;
  search: string;
}

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
      const { id } = req.params;
      const enterpriseAccount = await Account.findOne({
        where: { accountId: id, role: 'enterprise' },
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
      const { id } = req.params;
      const candidateAccount = await Account.findOne({
        where: { accountId: id, role: 'candidate' },
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

  public getAllUserList = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { page = 1, limit = 10, search = '' } = req.body as Pagination;

      const offset = (page - 1) * limit;
      const accounts = await Account.findAll({
        offset,
        limit
      });

      const totalCount = await Account.count({});

      res.status(200).json({
        status: 'success',
        data: {
          accounts: accounts,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page
        }
      });
    }
  );

  public getUnverifiedList = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { page = 1, limit = 10, search = '' } = req.body as Pagination;

      const offset = (page - 1) * limit;
      const unverifiedList = await Account.findAll({
        where: {
          role: 'candidate' || 'enterprise',
          verified: false
        },
        offset,
        limit
      });
      const totalCount = await Account.count({});

      res.status(200).json({
        status: 'success',
        data: {
          accounts: unverifiedList,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page
        }
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

  public verifyUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      // const { role } = req.body;
      const user = await Account.findOne({
        where: {
          accountId: id,
          // role: 'user',
          verified: false
        }
      });
      if (!user) {
        return next(new AppError('User not found or is verified', 404));
      }
      // if (role === user.role) {
      //   return next(new AppError('User already has this role', 400));
      // }
      user.verified = true;
      // user.role = role;
      await user.save();
      res.status(200).json({
        status: 'success',
        data: user
      });
    }
  );

  public deactivateAccount = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const account = await Account.findOne({
        where: {
          accountId: id,
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
      const { id } = req.params;
      const account = await Account.findOne({
        where: {
          accountId: id,
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

  public viewProfileById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const accountId = req.params.id;
      const sortBy = req.body.sortBy || 'createdAt';

      const { page = 1, limit = 10, search = '' } = req.body as Pagination;

      const offset = (page - 1) * limit;
      // const allowedFields = ALLOWED_ACCOUNT_FIELDS;
      const candidate = await Account.findOne({
        where: { accountId: accountId },
        // attributes: allowedFields,
        include: [
          {
            model: CandidateInfo,
            include: [
              {
                model: Language,
                as: 'languages',
                attributes: ['languageId', 'name']
              },
              {
                model: JobTitle,
                as: 'jobTitle',
                include: [
                  {
                    model: Skill,
                    as: 'skills',
                    attributes: ['skillId', 'skillName']
                  }
                ]
              }
            ]
          }
        ]
      });
      if (!candidate) {
        return next(new AppError('Candidate not found', 404));
      }

      const ratings = await Rating.findAll({
        where: { candidateUsername: candidate.username },
        attributes: [
          [sequelize.fn('avg', sequelize.col('price')), 'avg_price'],
          [sequelize.fn('avg', sequelize.col('time')), 'avg_time'],
          [
            sequelize.fn('avg', sequelize.col('responsibility')),
            'avg_responsibility'
          ],
          [
            sequelize.fn('avg', sequelize.col('communication')),
            'avg_communication'
          ],
          [
            sequelize.fn('avg', sequelize.col('overallRating')),
            'avg_overallRating'
          ],
          [sequelize.fn('count', sequelize.col('comment')), 'comment_count']
        ],
        group: ['candidateUsername'],
        raw: true
      });

      const comments = await Rating.findAll({
        where: { candidateUsername: candidate.username },
        attributes: ['comment', 'overallRating', 'enterpriseUsername'],
        order: [[sortBy, 'DESC']], // Assuming you want to sort comments by 'sortBy'
        limit: limit,
        offset: offset
      });

      res.status(200).json({
        status: 'success',
        data: {
          candidate,
          ratings,
          comments
        }
      });
    }
  );
}

export default new AdminController();
