import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import catchAsync from '../utils/catchAsync';
import Post from '../database/models/post.model';
import Account from '../database/models/account.model';
import PostTag from '../database/models/postTag.model';
import AppError from '~/utils/appError';
import Tag from '~/database/models/tag.model';

class TagController {
  public createTag = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { tagName, tagDescription } = req.body;
      const newTag = await Tag.create({ tagName, tagDescription });
      res.status(201).json({
        status: 'success',
        data: newTag
      });
    }
  );
  public getAllTags = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const tags = await Tag.findAll();
      res.status(200).json({
        status: 'success',
        data: tags
      });
    }
  );
  public getTagByName = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { tagName } = req.params;
      const tags = await Tag.findAll({
        where: {
          tagName: {
            [Op.like]: `%${tagName}%`
          }
        }
      });
      if (tags.length === 0) {
        return next(new AppError('Tag not found', 404));
      }
      res.status(200).json({
        status: 'success',
        data: tags
      });
    }
  );
  public getMostPopularTags = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const tags = await Tag.findAll({
        order: [
          ['popularity', 'DESC'],
          ['tagName', 'ASC']
        ]
      });
      res.status(200).json({
        status: 'success',
        data: tags
      });
    }
  );
}

export default new TagController();
