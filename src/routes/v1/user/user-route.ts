import express from 'express';
import { UserController } from '../../../controllers/user/user-controller';
import { authenticateJWT } from '../../../middlewares/jwt-middleware';

const router = express.Router();

router.get('/user', authenticateJWT, UserController.getUser);
export default router;
