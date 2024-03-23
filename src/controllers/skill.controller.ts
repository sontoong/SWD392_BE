import { Request, Response, NextFunction } from 'express';
import Account from '~/database/models/account.model';
import EnterpriseInfo from '~/database/models/enterpriseInfo.model';
import CandidateInfo from '~/database/models/candidateInfo.model';
import Rating from '~/database/models/rating.model';
import AppError from '~/utils/appError';
import catchAsync from '../utils/catchAsync';
import Skill from '~/database/models/skill.model';
import JobTitle from '~/database/models/jobTitle.model';

class SkillController {
  public getSkillList = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const skills = await Skill.findAll();
      res.status(200).json({
        status: 'success',
        data: {
          skills
        }
      });
    }
  );

  public getSkillBasedOnJobId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const jobId = req.params.jobId;
      const skills = await Skill.findAll({
        include: [
          {
            model: JobTitle,
            where: {
              jobTitleId: jobId
            }
          }
        ]
      });
      res.status(200).json({
        status: 'success',
        data: {
          skills
        }
      });
    }
  );

  public createSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { skillName } = req.body;
      const newSkill = await Skill.create({
        skillName
      });
      res.status(201).json({
        status: 'success',
        data: {
          skill: newSkill
        }
      });
    }
  );

  public updateSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const skillId = req.params.skillId;
      const skill = await Skill.findByPk(skillId);
      if (!skill) return next(new AppError('Skill not found', 404));
      const { skillName } = req.body;
      await skill.update({ skillName });
      res.status(200).json({
        status: 'success',
        data: {
          skill
        }
      });
    }
  );

  public deleteSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const skillId = req.params.skillId;
      const skill = await Skill.findByPk(skillId);
      if (!skill) return next(new AppError('Skill not found', 404));
      await skill.destroy();
      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  );
}

export default new SkillController();
