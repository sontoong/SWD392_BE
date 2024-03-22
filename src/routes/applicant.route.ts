import express from 'express';
import applicantsController from '~/controllers/applicants.controller';
import jobTitleController from '~/controllers/jobTitle.controller';
import orderController from '~/controllers/order.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

router.route('/create').post(applicantsController.createNewApplicant);

export default router;
