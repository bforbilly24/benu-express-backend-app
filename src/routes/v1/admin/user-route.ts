import express from 'express';
import { AdminUserController } from '../../../controllers/admin/user-controller';
import { authenticateJWT } from '../../../middlewares/jwt-middleware';

const router = express.Router();

router.get('/:id', authenticateJWT, AdminUserController.getUserById);

export default router;
