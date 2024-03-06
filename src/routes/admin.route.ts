import express from 'express';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
import adminController from '~/controllers/admin.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints for admin operations
 */

/**
 * @swagger
 * /admin/candidate:
 *   get:
 *     summary: Get list of candidate accounts
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 */
router
  .route('/candidate')
  .get(
    protectRoute,
    restrictTo('admin'),
    adminController.getCandidateAccountList
  );

/**
 * @swagger
 * /admin/candidate/{username}:
 *   get:
 *     summary: Get details of a candidate account
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 *       '404':
 *         description: Candidate account not found
 *   patch:
 *     summary: Update candidate account info
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Specify fields to update
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 *       '404':
 *         description: Candidate account not found
 */
router
  .route('/candidate/:username')
  .get(
    protectRoute,
    restrictTo('admin'),
    adminController.getCandidateAccountDetail
  )
  .patch(
    protectRoute,
    restrictTo('admin'),
    adminController.updateCandidateInfo
  );

/**
 * @swagger
 * /admin/enterprise:
 *   get:
 *     summary: Get list of enterprise accounts
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 */
router.get(
  '/enterprise',
  protectRoute,
  restrictTo('admin'),
  adminController.getEnterpriseAccountList
);

/**
 * @swagger
 * /admin/enterprise/{username}:
 *   get:
 *     summary: Get details of an enterprise account
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 *       '404':
 *         description: Enterprise account not found
 *   patch:
 *     summary: Update enterprise account info
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Specify fields to update
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 *       '404':
 *         description: Enterprise account not found
 */
router
  .route('/enterprise/:username')
  .get(
    protectRoute,
    restrictTo('admin'),
    adminController.getEnterpriseAccountDetail
  )
  .patch(
    protectRoute,
    restrictTo('admin'),
    adminController.updateEnterpriseInfo
  );

/**
 * @swagger
 * /admin/verify/{username}:
 *   patch:
 *     summary: Verify user and add role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [enterprise, candidate, user, admin]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 *       '404':
 *         description: User not found
 *       '400':
 *         description: User already has this role
 */

router.patch(
  '/verify/:username',
  protectRoute,
  restrictTo('admin'),
  adminController.verifyUserAndAddRole
);

/**
 * @swagger
 * /admin/deactivate/{username}:
 *   patch:
 *     summary: Deactivate user account
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 *       '404':
 *         description: User account not found
 */
router.patch(
  '/deactivate/:username',
  protectRoute,
  restrictTo('admin'),
  adminController.deactivateAccount
);

/**
 * @swagger
 * /admin/activate/{username}:
 *   patch:
 *     summary: Activate user account
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized, authentication failed
 *       '403':
 *         description: Forbidden, user does not have permission
 *       '404':
 *         description: User account not found
 */
router.patch(
  '/activate/:username',
  protectRoute,
  restrictTo('admin'),
  adminController.activateAccount
);

export default router;
