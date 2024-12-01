import { Request, Response } from 'express';
import { UserModel } from '../../models/user-model';
import { generateToken } from '../../middlewares/jwt-middleware';

export class AuthController {
	static async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: 'Email and password are required.',
			});
		}

		try {
			const user = await UserModel.findByEmail(email);
			if (!user || user.role !== 'admin') {
				return res.status(401).json({
					message: 'Admin not found.',
				});
			}

			const isValidPassword = await UserModel.verifyPassword(password, user.password);
			if (!isValidPassword) {
				return res.status(401).json({
					message: 'Invalid password.',
				});
			}

			const token = generateToken({ id: user.id, role: user.role });

			return res.status(200).json({
				message: 'Success',
				user: {
					id: user.id,
					username: user.username,
					role: user.role,
					email: user.email,
				},
				token: token,
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				message: 'Internal server error.',
			});
		}
	}
}
