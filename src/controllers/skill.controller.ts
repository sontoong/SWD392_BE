import { Request, Response, NextFunction } from 'express';
import Account from '~/database/models/account.model';
import EnterpriseInfo from '~/database/models/enterpriseInfo.model';
import CandidateInfo from '~/database/models/candidateInfo.model';
import Rating from '~/database/models/rating.model';
import AppError from '~/utils/appError';
import catchAsync from '../utils/catchAsync';

class SkillController {}

export default new SkillController();
