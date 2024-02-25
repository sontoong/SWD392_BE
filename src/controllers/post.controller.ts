import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import Post from '../database/models/post.model';
import Account from '../database/models/account.model';
import PostTag from '../database/models/postTag.model';
import AppError from '~/utils/appError';

class PostController {
  public createPost = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        content,
        postTitle,
        budget,
        jobTitle,
        duration,
        participants,
        experience,
        expireDate
      } = req.body;

      if (!req.user || !req.user.verified) {
        return next(
          new AppError(
            'You are not verified. Please login or request verification from admin.',
            401
          )
        );
      }

      const accountId = req.user!.accountId;
      const newPost = await Post.create({
        content,
        postTitle,
        budget,
        jobTitle,
        duration,
        participants,
        experience,
        expireDate,
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
      const posts = await Post.findAll();
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
        budget,
        jobTitle,
        duration,
        participants,
        experience,
        expireDate
      } = req.body;
      const [updated] = await Post.update(
        {
          content,
          postTitle,
          budget,
          jobTitle,
          duration,
          participants,
          experience,
          expireDate
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
