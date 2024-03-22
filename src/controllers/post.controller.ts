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
interface Pagination {
  page: number;
  limit: number;
  search: string;
}
class PostController {
  public createNewPost = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        title,
        description,
        funding,
        candidateRequirement,
        initialFunding,
        timeToComplete,
        projectField,
        createdBy,
        privacy,
        projectType,
        optionalRequirements
      } = req.body;
      try {
        const requiredFields = [
          'title',
          'description',
          'funding',
          'candidateRequirement',
          'initialFunding',
          'timeToComplete',
          'createdBy',
          'privacy',
          'projectType'
        ];
        for (const field of requiredFields) {
          if (!(field in req.body)) {
            return next(new AppError('invalid input', 404));
          }
        }
        const existingProject = await Project.findOne({ where: { title } });
        if (existingProject) {
          return next(
            new AppError(
              `A project with the title "${title}" already exists.`,
              400
            )
          );
        }
        const projectData: ProjectAttributes = {
          title,
          description,
          funding,
          candidateRequirement,
          initialFunding,
          timeToComplete,
          projectField,
          createdBy,
          privacy,
          projectType,
          optionalRequirements: req.body
            .optionalRequirements as OptionalRequirements
        };
        const newProject = await Project.create(projectData);
        res.status(201).json({
          success: true,
          message: 'Project created successfully.',
          data: newProject
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code));
      }
    }
  );

  public getAllNewPosts = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { page = 1, limit = 10, search = '' } = req.body as Pagination;

      const offset = (page - 1) * limit;
      const projects = await Project.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } }
          ]
        },
        include: [{ model: JobTitle }],
        offset,
        limit
      });

      const parsedProjects = projects.map((project) => {
        const parsedOptionalRequirements: OptionalRequirements = JSON.parse(
          String(project.optionalRequirements)
        );
        return {
          ...project.toJSON(),
          optionalRequirements: parsedOptionalRequirements
        };
      });

      const totalCount = await Project.count({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } }
          ]
        }
      });

      res.status(200).json({
        status: 'success',
        data: {
          projects: parsedProjects,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page
        }
      });
    }
  );

  public getOneProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const project = await Project.findByPk(req.params.id, {
        include: [{ model: JobTitle }]
      });
      if (!project) {
        return next(new AppError('hello error', 404));
      }

      const optionalRequirements: OptionalRequirements = JSON.parse(
        String(project.optionalRequirements)
      ) as OptionalRequirements;
      res.status(200).json({
        status: 'success',
        data: {
          ...project.toJSON(),
          optionalRequirements
        }
      });
    }
  );

  public updateNewProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        title,
        description,
        funding,
        candidateRequirement,
        initialFunding,
        timeToComplete,
        createdBy, // not it
        privacy,
        projectType,
        optionalRequirements
      } = req.body;
      const id = req.params.id;
      try {
        const existingProject = await Project.findByPk(id);
        if (!existingProject) {
          return next(new AppError(`A project not found`, 400));
        }
        existingProject.title = title || existingProject.title;
        existingProject.description =
          description || existingProject.description;
        existingProject.funding = funding || existingProject.funding;
        existingProject.candidateRequirement =
          candidateRequirement || existingProject.candidateRequirement;
        existingProject.initialFunding =
          initialFunding || existingProject.initialFunding;
        existingProject.timeToComplete =
          timeToComplete || existingProject.timeToComplete;
        existingProject.privacy = privacy || existingProject.privacy;
        existingProject.projectType =
          projectType || existingProject.projectType;

        // optionalRequirement

        if (!existingProject.optionalRequirements) {
          existingProject.optionalRequirements = undefined;
        }
        if (optionalRequirements) {
          // Parse the existing optionalRequirements string into an object
          // const updateOptional = JSON.parse(existingProject.optionalRequirements || undefined);
          // Update the properties with new values
          // updateOptional.minimumCompletedProjects = optionalRequirements.minimumCompletedProjects || updateOptional.minimumCompletedProjects;
          // updateOptional.rating = optionalRequirements.rating || updateOptional.rating;
          // updateOptional.nation = optionalRequirements.nation || updateOptional.nation;
          // updateOptional.language = optionalRequirements.language || updateOptional.language;
          // updateOptional.skills = optionalRequirements.skills || updateOptional.skills;
          // updateOptional.questions = optionalRequirements.questions || updateOptional.questions;
          // Convert the updated object back to a string
          // existingProject.optionalRequirements = JSON.stringify(updateOptional);
        }

        //optional requirements
        await existingProject.save();

        const optional: OptionalRequirements = JSON.parse(
          String(existingProject.optionalRequirements)
        ) as OptionalRequirements;
        return res.status(201).json({
          success: true,
          data: {
            ...existingProject.toJSON(),
            optional
          }
        });
      } catch (error: any) {
        return next(new AppError(error.message, error.code));
      }
    }
  );

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
