import express from 'express';
import contractController from '~/controllers/contract.controller';
import jobTitleController from '~/controllers/jobTitle.controller';
import orderController from '~/controllers/order.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';
const router = express.Router();

router.route('/create').post(contractController.createNewContract)
router.route('/').get(contractController.getAllContracts)
router.route('/get-one/:id').get(contractController.getOneContractById)
router.route('/update-doing/:id').put(contractController.updateContractStatusDoing)
router.route('/update-canceled/:id').put(contractController.updateContractStatusToCanceled)
router.route('/update-completed/:id').put(contractController.updateContractStatusToCompleted);
// get by status
router.route('/doing').get(contractController.getAllContractsDoing)
router.route('/canceled').get(contractController.getAllContractsCanceled)
router.route('/completed').get(contractController.getAllContractsCompleted)
router.route('/pending').get(contractController.getAllContractsPending)
router.route('/signature').put(contractController.updateContractSignature)
export default router;
