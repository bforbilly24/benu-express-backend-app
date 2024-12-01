import express from 'express';
import { AuthController } from '../../../controllers/admin/auth-controller';

const router = express.Router();

router.post('/login', async (req, res) => {
	await AuthController.login(req, res);
});

export default router;
