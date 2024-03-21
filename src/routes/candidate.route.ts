import express from 'express';
import candidateController from '../controllers/candidate.controller';
import { protectRoute } from '~/middlewares/jwt.middleware';

const router = express.Router();

/**
 * @swagger
 * /candidates/get-all-candidates:
 *   get:
 *     summary: Get all candidates
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of candidates per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort the candidates by (e.g., createdAt)
 *     responses:
 *       '200':
 *         description: A list of candidates
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
 *                     candidates:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Candidate'
 *                     count:
 *                       type: integer
 *                       example: 10
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  '/get-all-candidates',
  protectRoute,
  candidateController.getAllCandidates
);
/**
 * @swagger
 * /candidates/profile:
 *   get:
 *     summary: View profile of the logged-in candidate
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile of the logged-in candidate
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
 *                     candidate:
 *                       $ref: '#/components/schemas/Candidate'
 *                     ratings:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Rating'
 *                     comments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Rating'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get('/profile', protectRoute, candidateController.viewProfile);

/**
 * @swagger
 * /candidates/profile/{id}:
 *   get:
 *     summary: View profile of a candidate by ID
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Candidate ID
 *     responses:
 *       '200':
 *         description: Profile of the candidate
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
 *                     candidate:
 *                       $ref: '#/components/schemas/Candidate'
 *                     ratings:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Rating'
 *                     comments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Rating'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/profile/:id', protectRoute, candidateController.viewProfileById);

/**
 * @swagger
 * /candidates/edit-profile:
 *   put:
 *     summary: Edit profile information of the logged-in candidate
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandidateInfo'
 *     responses:
 *       '200':
 *         description: Profile information updated successfully
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
 *                     candidateInfo:
 *                       $ref: '#/components/schemas/CandidateInfo'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.put('/edit-profile', protectRoute, candidateController.editProfileInfo);

/**
 * @swagger
 * /candidates/edit-contact:
 *   put:
 *     summary: Edit contact information of the logged-in candidate
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandidateInfo'
 *     responses:
 *       '200':
 *         description: Profile information updated successfully
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
 *                     candidateInfo:
 *                       $ref: '#/components/schemas/CandidateInfo'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.put(
  '/edit-contact',
  protectRoute,
  candidateController.editProfileContact
);
export default router;
