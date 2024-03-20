import express from 'express';
import ratingController from '~/controllers/rating.controller';

const router = express.Router();

router.post('/rating', ratingController.createRating);

export default router;
