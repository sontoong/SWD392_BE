import express from 'express';
import postController from '~/controllers/post.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

router
  .route('/')
  .get(protectRoute, postController.getAllPosts)
  .post(protectRoute, postController.createPost);

export default router;
