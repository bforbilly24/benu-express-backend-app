import { Request, Response } from 'express';
import { UserModel } from '../../models/user-model';

interface AuthenticatedRequest extends Request {
	userId?: string;
	userRole?: string;
}

export class UserController {
	static async getUser(req: AuthenticatedRequest, res: Response): Promise<void> {
		const userId = req.userId;

		if (!userId) {
			res.status(400).json({ message: 'User ID is missing.' });
			return;
		}

		try {
			const user = await UserModel.findById(userId);

			if (!user) {
				res.status(404).json({ message: 'User not found.' });
				return;
			}

			res.status(200).json(user); 
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}
