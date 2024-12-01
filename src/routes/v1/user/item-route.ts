import express, { Request, Response } from 'express';
import { ItemController } from '../../../controllers/user/item-controller';
import { AuthenticatedRequest } from '../../../types/express/user';
import imageUploadMiddleware from '../../../middlewares/upload-middleware';

const router = express.Router();

router.post('/create', imageUploadMiddleware, async (req: AuthenticatedRequest, res: Response) => {
	await ItemController.createItem(req, res);
});

router.put('/:id', imageUploadMiddleware, async (req: AuthenticatedRequest, res: Response) => {
	await ItemController.updateItem(req, res);
});

router.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
	await ItemController.getItemById(req, res);
});

router.get('/', async (req: AuthenticatedRequest, res: Response) => {
	await ItemController.getAllItems(req, res);
});

export default router;
