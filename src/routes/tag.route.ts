import express from 'express';
import tagController from '~/controllers/tag.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
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
 *                     $ref: '#/components/schemas/Tag'
 *       '401':
 *         description: Unauthorized, authentication failed
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       '201':
 *         description: Tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '401':
 *         description: Unauthorized, authentication failed
 *
 * /tags/search/{tagName}:
 *   get:
 *     summary: Search for tags by name
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tagName
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
 *                     $ref: '#/components/schemas/Tag'
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: Tag not found
 *
 * /tags/popular:
 *   get:
 *     summary: Get most popular tags
 *     tags: [Tags]
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
 *                     $ref: '#/components/schemas/Tag'
 *       '401':
 *         description: Unauthorized, authentication failed
 */
router
  .route('/')
  .get(protectRoute, tagController.getAllTags)
  .post(protectRoute, tagController.createTag);
router.get('/search/:tagName', protectRoute, tagController.getTagByName);
router.get('/popular', protectRoute, tagController.getMostPopularTags);

export default router;
