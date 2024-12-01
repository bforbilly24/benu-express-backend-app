import express from 'express';
import { getStatus } from '../../controllers/status-controller';

const router = express.Router();

router.get('/status', getStatus);

export default router;
