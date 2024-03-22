import express from 'express';
import jobTitleController from '~/controllers/jobTitle.controller';
import orderController from '~/controllers/order.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

router.route('/create-payment').post(orderController.CreateVnPayPayment);

export default router;
