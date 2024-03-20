import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import Post from '../database/models/post.model';
import AppError from '~/utils/appError';
import { LIMIT_PAGE, OFFSET } from '~/utils/constant';

class PostController {
  public createPost = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        content,
        postTitle,
        language,
        address,
        budgetType,
        budget,
        jobTitle,
        duration,
        durationType,
        privacy,
        contract,
        participants,
        experience,
        ratingRequired
        // skillRequired,
        // questions
        // expireDate
      } = req.body;

      if (!req.userInfo || !req.userInfo.verified) {
        return next(
          new AppError(
            'You are not verified. Please login or request verification from admin.',
            401
          )
        );
      }

      const accountId = req.userInfo!.accountId;
      const newPost = await Post.create({
        content,
        postTitle,
        language,
        address,
        budgetType,
        budget,
        // jobTitle,
        duration,
        durationType,
        privacy,
        contract,
        participants,
        experience,
        ratingRequired,
        // skillRequired,
        // questions,
        enterpriseId: accountId!
      });

      res.status(201).json({
        status: 'success',
        data: newPost
      });
    }
  );

  public getAllPosts = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const sortBy = req.body.sortBy || 'createdAt';
      const limit = req.body.limit || LIMIT_PAGE;
      // let offset = 0 || OFFSET;
      const offset = req.body.page ? 0 + (req.body.page - 1) * limit : OFFSET;
      // const { jobTitle, budgetType, duration } = req.body;
      const posts = await Post.findAll({
        where: { privacy: 'public' },
        order: [[sortBy, 'DESC']],
        limit,
        offset
      });
      res.status(200).json({
        status: 'success',
        data: posts
      });
    }
  );

  // Method to get a single post by ID
  public getPostById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const postId = parseInt(req.params.postId, 10);
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    }
  );

  // Method to update a post
  public updatePost = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const postId = parseInt(req.params.postId, 10);
      const {
        content,
        postTitle,
        language,
        address,
        budgetType,
        budget,
        duration,
        durationType,
        privacy,
        contract,
        participants,
        experience,
        ratingRequired
        // skillRequired,
        // questions
      } = req.body;
      const [updated] = await Post.update(
        {
          content,
          postTitle,
          language,
          address,
          budgetType,
          budget,
          duration,
          durationType,
          privacy,
          contract,
          participants,
          experience,
          ratingRequired
          // skillRequired,
          // questions
        },
        { where: { postId } }
      );
      if (updated) {
        const updatedPost = await Post.findByPk(postId);
        return res.json(updatedPost);
      }
      throw new Error('Post not found');
    }
  );

  // Method to delete a post
  public deletePost = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const postId = parseInt(req.params.postId, 10);
      const deleted = await Post.destroy({ where: { postId } });
      if (deleted) {
        return res.status(204).send();
      }
      throw new Error('Post not found');
    }
  );
}

export default new PostController();
