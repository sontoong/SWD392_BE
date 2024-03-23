import express from 'express';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
import skillController from '~/controllers/skill.controller';
const router = express.Router();

router.get('/list', skillController.getSkillList);

router.post(
  '/create',
  protectRoute,
  //   restrictTo('admin'),
  skillController.createSkill
);

router.put('/:skillId', protectRoute, skillController.updateSkill);

router.delete('/:skillId', protectRoute, skillController.deleteSkill);

export default router;
