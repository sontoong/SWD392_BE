import express from 'express';
import applicantsController from '~/controllers/applicants.controller';
import jobTitleController from '~/controllers/jobTitle.controller';
import orderController from '~/controllers/order.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

router.route('/create').post(applicantsController.createNewApplicant);
router.route('/rejected').put(applicantsController.updateStatusApplicantToRejected)
router.route('/accepted').put(applicantsController.updateStatusApplicantToAccepted);
router.route('/').get(applicantsController.getAllApplicant)
router.route('/:id').get(applicantsController.getAllApplicantByID)
export default router;
