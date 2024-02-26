import express from 'express';
import postController from '~/controllers/post.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

router
  .route('/')
  .get(protectRoute, postController.getAllPosts)
  .post(protectRoute, postController.createPost)
  .patch(protectRoute, postController.updatePost)
  .delete(protectRoute, postController.deletePost);

export default router;
