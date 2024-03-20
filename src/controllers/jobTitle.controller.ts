import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import catchAsync from '../utils/catchAsync';
import Post from '../database/models/post.model';
import Account from '../database/models/account.model';
import PostJobTitle from '../database/models/postJobTitle.model';
import AppError from '~/utils/appError';
import JobTitle from '~/database/models/jobTitle.model';
import Skill from '~/database/models/skill.model';

class JobTitleController {
  public createJobTitle = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { jobTitleName, jobTitleDescription } = req.body;
      const newJobTitle = await JobTitle.create({
        jobTitleName,
        jobTitleDescription
      });
      res.status(201).json({
        status: 'success',
        data: newJobTitle
      });
    }
  );
  public getAllJobTitles = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const jobTitles = await JobTitle.findAll({
        include: [{ model: Skill }]
      });
      res.status(200).json({
        status: 'success',
        data: jobTitles
      });
    }
  );
  public getJobTitleByName = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { jobTitleName } = req.params;
      const jobTitles = await JobTitle.findAll({
        where: {
          jobTitleName: {
            [Op.like]: `%${jobTitleName}%`
          }
        },
        include: [Skill]
      });
      if (jobTitles.length === 0) {
        return next(new AppError('JobTitle not found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: jobTitles
      });
    }
  );
  public getMostPopularJobTitles = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const jobTitles = await JobTitle.findAll({
        order: [
          ['popularity', 'DESC'],
          ['jobTitleName', 'ASC']
        ],
        include: [Skill]
      });
      res.status(200).json({
        status: 'success',
        data: jobTitles
      });
    }
  );
}

export default new JobTitleController();
