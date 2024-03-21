import express from 'express';
import jobTitleController from '~/controllers/jobTitle.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Job Titles
 *   description: Endpoints for job title operations
 */

/**
 * @swagger
 * /job-titles:
 *   get:
 *     summary: Get all jobTitles
 *     jobTitles: [JobTitles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobTitle'
 *       '401':
 *         description: Unauthorized, authentication failed
 *   post:
 *     summary: Create a new jobTitle
 *     jobTitles: [JobTitles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobTitle'
 *     responses:
 *       '201':
 *         description: JobTitle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobTitle'
 *       '401':
 *         description: Unauthorized, authentication failed
 *
 * /job-titles/search/{jobTitleName}:
 *   get:
 *     summary: Search for jobTitles by name
 *     jobTitles: [JobTitles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobTitleName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobTitle'
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: JobTitle not found
 *
 * /job-titles/popular:
 *   get:
 *     summary: Get most popular jobTitles
 *     jobTitles: [JobTitles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobTitle'
 *       '401':
 *         description: Unauthorized, authentication failed
 */
router
  .route('/')
  .get(protectRoute, jobTitleController.getAllJobTitles)
  .post(protectRoute, jobTitleController.createJobTitle);
router.get(
  '/search/:jobTitleName',
  protectRoute,
  jobTitleController.getJobTitleByName
);
router.get(
  '/popular',
  protectRoute,
  jobTitleController.getMostPopularJobTitles
);

export default router;
