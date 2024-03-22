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
import Contract, { ContractAttributes } from '~/database/models/contract.model';
class ApplicantController {
  public createNewContract = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { applicantId, fund, depositType, date, status, signature } =
        req.body;
      try {
        const requiredFields = ['applicantId', 'fund', 'depositType', 'date'];
        for (const field of requiredFields) {
          if (!(field in req.body)) {
            return next(new AppError(`Invalid input: Missing ${field}`, 400));
          }
        }

        const applicant = await Applicant.findByPk(applicantId);
        if (!applicant) {
          return next(
            new AppError(`Applicant with ID ${applicantId} not found`, 404)
          );
        }

        const contractData: ContractAttributes = {
          applicantId,
          fund,
          depositType,
          date,
          status: status || 'pending', // Set default value for status if not provided
          signature
        };

        const newContract = await Contract.create(contractData);

        res.status(201).json({
          success: true,
          message: 'Contract created successfully.',
          data: newContract
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code));
      }
    }
  );
 // cancel
 public getAllContractsCanceled = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const allContracts = await Contract.findAll({
          include: [
            {
              model: Applicant,
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
            }
          ],
          where: {
            status: 'canceled' 
          }
        });

        res.status(200).json({
          success: true,
          message: 'All contracts fetched successfully',
          data: allContracts
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code || 500));
      }
    }
  );
 // pending
 public getAllContractsPending = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const allContracts = await Contract.findAll({
          include: [
            {
              model: Applicant,
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
            }
          ],
          where: {
            status: 'pending' 
          }
        });

        res.status(200).json({
          success: true,
          message: 'All contracts fetched successfully',
          data: allContracts
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code || 500));
      }
    }
  );
 // completed
 public getAllContractsCompleted = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const allContracts = await Contract.findAll({
          include: [
            {
              model: Applicant,
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
            }
          ],
          where: {
            status: 'completed' 
          }
        });

        res.status(200).json({
          success: true,
          message: 'All contracts fetched successfully',
          data: allContracts
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code || 500));
      }
    }
  );
 // doing
 public getAllContracts = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const allContracts = await Contract.findAll({
          include: [
            {
              model: Applicant,
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
            }
          ],
          where: {
            status: 'doing' 
          }
        });

        res.status(200).json({
          success: true,
          message: 'All contracts fetched successfully',
          data: allContracts
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code || 500));
      }
    }
  );




  public getAllContractsDoing = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const allContracts = await Contract.findAll({
          include: [
            {
              model: Applicant,
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
            }
          ]
        });

        res.status(200).json({
          success: true,
          message: 'All contracts fetched successfully',
          data: allContracts
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code || 500));
      }
    }
  );

  public getOneContractById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const contract = await Contract.findByPk(id, {
          include: [
            {
              model: Applicant,
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
            }
          ]
        });

        if (!contract) {
          return next(new AppError(`Contract with ID ${id} not found`, 404));
        }

        res.status(200).json({
          success: true,
          message: 'Contract fetched successfully',
          data: contract
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code || 500));
      }
    }
  );

  public updateContractStatusDoing = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const contract = await Contract.findByPk(id);

        if (!contract) {
          return next(new AppError(`Contract with ID ${id} not found`, 404));
        }

        await contract.update({ status: 'doing' });

        res.status(200).json({
          success: true,
          message: 'Contract status updated to "doing"',
          data: contract
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code || 500));
      }
    }
  );

  public updateContractStatusToCanceled = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params; //
      try {
        const contract = await Contract.findByPk(id);

        if (!contract) {
          return next(new AppError(`Contract with ID ${id} not found`, 404));
        }

        await contract.update({ status: 'canceled' });

        res.status(200).json({
          success: true,
          message: 'Contract status updated to "canceled"',
          data: contract 
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code || 500));
      }
    }
  );

  public updateContractStatusToCompleted = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Assuming contract ID 
    try {
      const contract = await Contract.findByPk(id);
  
      if (!contract) {
        return next(new AppError(`Contract with ID ${id} not found`, 404));
      }
  
      await contract.update({ status: "completed" });
  
      res.status(200).json({
        success: true,
        message: 'Contract status updated to "completed"',
        data: contract 
      });
    } catch (error: any) {
      return next(new AppError(error.message, error.code || 500));
    }
  });
}

export default new ApplicantController();
