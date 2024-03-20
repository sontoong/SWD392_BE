import express from 'express';
import candidateController from '../controllers/candidate.controller';
import { protectRoute } from '~/middlewares/jwt.middleware';

const router = express.Router();

router.get(
  '/get-all-candidates',
  protectRoute,
  candidateController.getAllCandidates
);
router.get('/profile', protectRoute, candidateController.viewProfile);

export default router;
