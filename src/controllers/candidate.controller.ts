const mongoose = require('mongoose');
import { Request, Response, NextFunction } from 'express';

import AppError from '~/utils/appError';
import catchAsync from '../utils/catchAsync';
import {
  LIMIT_PAGE,
  OFFSET,
  ALLOWED_ACCOUNT_FIELDS,
  ALLOWED_CONTACT_FIELDS,
  ALLOWED_PROFILE_FIELDS
} from '~/utils/constant';
import Candidate from '../database/models/account.model';
import { filterObject } from '~/utils/filterObject';
import CandidateInfo from '~/database/models/candidateInfo.model';
import Rating from '~/database/models/rating.model';
import sequelize from 'sequelize';
import Language from '~/database/models/language.model';
import JobTitle from '~/database/models/jobTitle.model';
import Skill from '~/database/models/skill.model';
import JobTitleSkill from '~/database/models/jobTitleSkill.model';

class CandidateController {
  public viewProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const candidateId = req.userInfo?.accountId;
      const allowedFields = ALLOWED_ACCOUNT_FIELDS;
      const candidate = await Candidate.findOne({
        where: { accountId: candidateId },
        attributes: allowedFields,
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
      const sortBy = req.body.sortBy || 'createdAt';
      const limit = req.body.limit || LIMIT_PAGE;
      // let offset = 0 || OFFSET;
      const offset = req.body.page ? 0 + (req.body.page - 1) * limit : OFFSET;
      // if (req.body.page) {
      //   offset = 0 + (req.body.page - 1) * limit;
      // }
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

  public viewProfileById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const candidateId = req.params.id;
      const allowedFields = ALLOWED_ACCOUNT_FIELDS;
      const candidate = await Candidate.findOne({
        where: { accountId: candidateId },
        attributes: allowedFields,
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
      const sortBy = req.body.sortBy || 'createdAt';
      const limit = req.body.limit || LIMIT_PAGE;
      // let offset = 0 || OFFSET;
      const offset = req.body.page ? 0 + (req.body.page - 1) * limit : OFFSET;
      // if (req.body.page) {
      //   offset = 0 + (req.body.page - 1) * limit;
      // }
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

  public sendVerifyRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  public getAllCandidates = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const allowedFields = ALLOWED_ACCOUNT_FIELDS;

      const limit = req.body.limit || LIMIT_PAGE;
      let offset = 0 || OFFSET;
      if (req.body.page) {
        offset = 0 + (req.body.page - 1) * limit;
      }
      const sortBy = req.body.sortBy || 'createdAt';
      const candidates = await Candidate.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [[sortBy, 'DESC']],
        where: { role: 'candidate', active: true },
        attributes: allowedFields,
        include: [CandidateInfo]
      });
      res.status(200).json({
        status: 'success',
        data: candidates
      });
    }
  );

  public editProfileContact = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const candidateId = req.userInfo?.accountId;
      const allowedFields = ALLOWED_CONTACT_FIELDS;
      const filteredBody = filterObject(req.body, allowedFields);
      const candidate = await Candidate.update(filteredBody, {
        where: { accountId: candidateId },
        validate: true
      });
      res.status(200).json({
        status: 'success',
        data: candidate
      });
    }
  );

  public editProfileInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const candidateId = req.userInfo?.accountId;
      const allowedFields = ALLOWED_PROFILE_FIELDS;
      const filteredBody = filterObject(req.body, allowedFields);
      const candidateInfo = await CandidateInfo.update(filteredBody, {
        where: { accountId: candidateId },
        validate: true
      });
      res.status(200).json({
        status: 'success',
        data: candidateInfo
      });
    }
  );

  // public editSkills = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const candidateId = req.userInfo?.accountId;
  //     const { skills } = req.body;
  //     const jobTitleId = await CandidateInfo.findOne({
  //       where: { accountId: candidateId },
  //       attributes: ['jobTitleId']
  //     });
  //     if (!jobTitleId) {
  //       return next(new AppError('Job title not found', 404));
  //     }

  //     const candidate = await JobTitleSkill.update()
  //   }
  // );

  // public priceAnnouncement = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const candidateId = req.userInfo?.accountId;
  //     const { price, estimateTime } = req.body;
  //     const candidate = await CandidateInfo.update(
  //       { price },
  //       { where: { accountId: candidateId } }
  //     );
  //     res.status(200).json({
  //       status: 'success',
  //       data: candidate
  //     });
  //   }
  // );
}

export default new CandidateController();
