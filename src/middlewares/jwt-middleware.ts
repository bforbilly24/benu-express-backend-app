import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export const generateToken = (payload: object): string => {
	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers.authorization?.split(' ')[1] || '';

	if (!token) {
		res.status(401).json({ message: 'Access token is missing or invalid.' });
		return;
	}

	jwt.verify(token, process.env.JWT_SECRET!, (err: VerifyErrors | null, decoded?: JwtPayload | string) => {
		if (err) {
			res.status(403).json({ message: 'Token is not valid.' });
			return;
		}

		if (typeof decoded === 'object' && decoded !== null) {
			(req as any).userId = (decoded as JwtPayload).id;
			(req as any).userRole = (decoded as JwtPayload).role;
		}

		next();
	});
};

export const authenticateAdminJWT = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers.authorization?.split(' ')[1] || '';

	if (!token) {
		res.status(401).json({ message: 'Access token is missing or invalid.' });
		return;
	}

	jwt.verify(token, process.env.JWT_SECRET!, (err: VerifyErrors | null, decoded?: JwtPayload | string) => {
		if (err) {
			res.status(403).json({ message: 'Token is not valid.' });
			return;
		}

		if (typeof decoded === 'object' && decoded !== null) {
			const payload = decoded as JwtPayload;

			if (payload.role !== 'admin') {
				res.status(403).json({ message: 'Access denied. Admin rights required.' });
				return;
			}

			(req as any).userId = payload.id;
			(req as any).userRole = payload.role;
		}

		next();
	});
};
