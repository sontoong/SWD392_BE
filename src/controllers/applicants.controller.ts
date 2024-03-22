import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import Post from '../database/models/post.model';
import AppError from '~/utils/appError';
import { LIMIT_PAGE, OFFSET } from '~/utils/constant';
import Project, {
  OptionalRequirements,
  ProjectAttributes
} from '~/database/models/project.model';
import { Op } from 'sequelize';
import { union } from 'lodash';
import JobTitle from '~/database/models/jobTitle.model';
import Account from '~/database/models/account.model';
import Applicant, {
  ApplicantAttributes
} from '~/database/models/applicant.model';
class ApplicantController {
  public createNewApplicant = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { projectId, candidateId, question, money, time } = req.body;
      try {
        const requiredFields = [
          'projectId',
          'candidateId',
          'questions',
          'money',
          'time'
        ];
        for (const field of requiredFields) {
          if (!(field in req.body)) {
            return next(new AppError(`Invalid input: Missing ${field}`, 400));
          }
        }
        const project = await Project.findByPk(projectId);
        if (!project) {
          return next(
            new AppError(`Project with ID ${projectId} not found`, 404)
          );
        }
        const candidate = await Account.findByPk(candidateId);
        if (!candidate) {
          return next(
            new AppError(`Candidate with ID ${candidateId} not found`, 404)
          );
        }
        const applicantData: ApplicantAttributes = {
          projectId,
          candidateId,
          question,
          money,
          time
        };
        const newApplicant = await Applicant.create(applicantData);

        res.status(201).json({
          success: true,
          message: 'Applicant created successfully.',
          data: newApplicant
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code));
      }
    }
  );
}

export default new ApplicantController();
