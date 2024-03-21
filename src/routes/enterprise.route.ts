import express from 'express';
import ratingController from '~/controllers/rating.controller';

const router = express.Router();

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
