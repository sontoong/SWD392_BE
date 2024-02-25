import express from 'express';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
import adminController from '~/controllers/admin.controller';

const router = express.Router();

router
  .route('/candidate')
  .get(
    protectRoute,
    restrictTo('admin'),
    adminController.getCandidateAccountList
  );
router
  .route('/candidate/:username')
  .get(
    protectRoute,
    restrictTo('admin'),
    adminController.getCandidateAccountDetail
  )
  .patch(
    protectRoute,
    restrictTo('admin'),
    adminController.updateCandidateInfo
  );
router.get(
  '/enterprise',
  protectRoute,
  restrictTo('admin'),
  adminController.getEnterpriseAccountList
);
router.get(
  '/enterprise/:username',
  protectRoute,
  restrictTo('admin'),
  adminController.getEnterpriseAccountDetail
);

router;

export default router;
