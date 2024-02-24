import express from 'express';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
import authController from '~/controllers/authen.controller';

const router = express.Router();

export default router;
