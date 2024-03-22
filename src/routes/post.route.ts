import express from 'express';
import postController from '~/controllers/post.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints for posts operations
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
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
 *                     $ref: '#/components/schemas/Post'
 *       '401':
 *         description: Unauthorized, authentication failed
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '401':
 *         description: Unauthorized, authentication failed
 *   patch:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: Post not found
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Post deleted successfully
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: Post not found
 */

router
  .route('/')
  .get(protectRoute, postController.getAllPosts)
  .post(protectRoute, postController.createPost)
  .patch(protectRoute, postController.updatePost)
  .delete(protectRoute, postController.deletePost);
router.route('/create').post(postController.createNewPost);
router.route('/get-all').get(postController.getAllNewPosts);
router.route("/:id").get(postController.getOneProject)
export default router;
