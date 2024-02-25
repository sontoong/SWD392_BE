import express from 'express';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
import authController from '~/controllers/auth.controller';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;
