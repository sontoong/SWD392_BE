import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import Post from '../database/models/post.model';
import AppError from '~/utils/appError';
import { LIMIT_PAGE, OFFSET } from '~/utils/constant';
import Project, {
  OptionalRequirements,
  ProjectAttributes
} from '~/database/models/project.model';
import { Op, where } from 'sequelize';
import { includes, union } from 'lodash';
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

  public updateStatusApplicantToRejected = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const applicant = await Applicant.findByPk(id);
        if (!applicant) {
          return next(new AppError(`Applicant ith ID ${id} not found`, 404));
        }
        await applicant.update({ status: 'rejected' });
        res.status(201).json({
          success: true,
          message: 'Applicant update Rejected'
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code));
      }
    }
  );

  public updateStatusApplicantToAccepted = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const applicant = await Applicant.findByPk(id);
        if (!applicant) {
          return next(new AppError(`Applicant ith ID ${id} not found`, 404));
        }
        await applicant.update({ status: 'accepted' });
        res.status(201).json({
          success: true,
          message: 'Applicant update Accepted'
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code));
      }
    }
  );

  public getAllApplicant = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const allApplicant = await Applicant.findAll({
          include: [
            {
              model: Project,
              attributes: {
                exclude: [
                 'optionalRequirements',
                 'candidateCount',
                 'inviteAccepted',
                 'inviteSent',
                 'applicationCount',
                 'isVerified',
                 'isCompleted',
                 'projectField',
                 'createdBy'
                ]
              }
            },
            {
              model: Account,
              as: 'candidate',
              attributes: {
                exclude: [
                  'password',
                  'googleId',
                  'password',
                  'wallet',
                  'verified',
                  'active',
                  'passwordResetToken',
                  'passwordResetExpires',
                  'updatedAt',
                  'createdAt'
                ]
              }
            }
          ]
        });

        res.status(201).json({
          success: true,
          message: 'fetch all aplicants',
          data: allApplicant
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code));
      }
    }
  );

  public getAllApplicantByID = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const applicant = await Applicant.findByPk(req.params.id,
            
            {
                include: [
                    {
                      model: Project,
                      attributes: {
                        exclude: [
                         'optionalRequirements',
                         'candidateCount',
                         'inviteAccepted',
                         'inviteSent',
                         'applicationCount',
                         'isVerified',
                         'isCompleted',
                         'projectField',
                         'createdBy'
                        ]
                      }
                    },
                    {
                      model: Account,
                      as: 'candidate',
                      attributes: {
                        exclude: [
                          'password',
                          'googleId',
                          'password',
                          'wallet',
                          'verified',
                          'active',
                          'passwordResetToken',
                          'passwordResetExpires',
                          'updatedAt',
                          'createdAt'
                        ]
                      }
                    }
                  ]
            });
        res.status(201).json({
          success: true,
          message: 'fetch all aplicants',
          data: applicant
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code));
      }
    }
  );
}

export default new ApplicantController();
