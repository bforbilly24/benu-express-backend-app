import { Request, Response } from 'express';
import { UserModel } from '../../models/user-model';

export class AdminUserController {
	static async getUserById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		try {
			const user = await UserModel.findById(id);

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
