import express from 'express';
import tagController from '~/controllers/tag.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

router
  .route('/')
  .get(protectRoute, tagController.getAllTags)
  .post(protectRoute, tagController.createTag);
//   .patch(protectRoute, tagController.updatePost)
//   .delete(protectRoute, tagController.deletePost);
router.get('/search/:tagName', protectRoute, tagController.getTagByName);
router.get('/popular', protectRoute, tagController.getMostPopularTags);

export default router;
