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
router
  .route('/enterprise/:username')
  .get(
    protectRoute,
    restrictTo('admin'),
    adminController.getEnterpriseAccountDetail
  )
  .patch(
    protectRoute,
    restrictTo('admin'),
    adminController.updateEnterpriseInfo
  );

router.patch(
  '/verify/:username',
  protectRoute,
  restrictTo('admin'),
  adminController.verifyUserAndAddRole
);

router.patch(
  '/deactivate/:username',
  protectRoute,
  restrictTo('admin'),
  adminController.deactivateAccount
);

router.patch(
  '/activate/:username',
  protectRoute,
  restrictTo('admin'),
  adminController.activateAccount
);

export default router;
