import express from 'express';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
import authController from '~/controllers/auth.controller';
import passport from 'passport';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters
 *       '401':
 *         description: Unauthorized, invalid credentials
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out the currently authenticated user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 */
router.get('/logout', authController.logout);

// when this route is called, passport will redirect to google's login page, then take out profile and email

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirect to Google login page
 *     tags: [Authentication]
 *     responses:
 *       '302':
 *         description: Redirect to Google login page
 */
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
// when the user is redirected back to the application, passport will call the callback function

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google login callback
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Successfully authenticated via Google
 *       '401':
 *         description: Unauthorized, authentication failed
 */
router.get(
  '/google/callback',
  passport.authenticate('google'),
  authController.currentUser
);

export default router;
