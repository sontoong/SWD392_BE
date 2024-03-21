import express from 'express';
import ratingController from '~/controllers/rating.controller';
import enterpriseController from '~/controllers/enterprise.controller';
import { protectRoute } from '~/middlewares/jwt.middleware';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enterprise
 *   description: Endpoints for enterprise operations
 */

/**
 * @swagger
 * /enterprise:
 *   get:
 *     summary: Get enterprise info by account id
 *     tags: [Enterprise]
 *     security:
 *      - bearerAuth: []
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
 *                   $ref: '#/components/schemas/EnterpriseInfo'
 *       '401':
 *         description: Unauthorized, authentication failed
 *   post:
 *     summary: Create enterprise info
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnterpriseInfo'
 *     responses:
 *       '201':
 *         description: Enterprise info created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnterpriseInfo'
 *       '401':
 *         description: Unauthorized, authentication failed
 *   patch:
 *     summary: Update enterprise info by account id
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnterpriseInfo'
 *     responses:
 *       '200':
 *         description: Enterprise info updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnterpriseInfo'
 *       '401':
 *         description: Unauthorized, authentication failed
 *   delete:
 *     summary: Delete enterprise info by account id
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Enterprise info deleted
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: Enterprise info not found
 */
router
  .route('/')
  .get(protectRoute, enterpriseController.getEnterpriseInfo)
  .post(protectRoute, enterpriseController.createEnterpriseInfo)
  .patch(protectRoute, enterpriseController.updateEnterpriseInfo)
  .delete(protectRoute, enterpriseController.deleteEnterpriseInfo);

/**
 * @swagger
 * /enterprise/candidate/{candidateId}:
 *   get:
 *     summary: Get candidate info by candidate id
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CandidateInfo'
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: Candidate info not found
 *   post:
 *     summary: Invite candidate by candidate id
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Invitation sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Invitation sent
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: Candidate not found
 *
 */
router
  .route('/candidate/:candidateId')
  .get(protectRoute, enterpriseController.getCandidateInfoById)
  .post(protectRoute, enterpriseController.inviteCandidate);

/**
 * @swagger
 * /enterprise/candidate/{candidateId}/post/{postId}:
 *   post:
 *     summary: Pay salary for candidate by candidate id, post id and salary
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: integer
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
 *             type: object
 *             properties:
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Salary paid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Salary paid
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: Candidate/Post not found
 */
router
  .route('/candidate/:candidateId/post/:postId')
  .post(protectRoute, enterpriseController.paySalary);

/**
 * @swagger
 * /enterprise/search/{username}/{tagName}:
 *   get:
 *     summary: Search candidate by username and tag name
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
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
 *               $ref: '#/components/schemas/Account'
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '404':
 *         description: Candidate account not found
 */
router
  .route('/search/:username/:tagName')
  .get(protectRoute, enterpriseController.searchCandidate);

/**
 * @swagger
 * /rating:
 *   post:
 *     summary: Create a new rating
 *     tags: [Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enterpriseUsername:
 *                 type: string
 *               candidateUsername:
 *                 type: string
 *               quality:
 *                 type: number
 *               price:
 *                 type: number
 *               time:
 *                 type: number
 *               responsibility:
 *                 type: number
 *               communication:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Rating created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     rating:
 *                       $ref: '#/components/schemas/Rating'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post('/rating', ratingController.createRating);

export default router;
