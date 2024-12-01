import { Request } from 'express';
import { FileArray } from 'multer';

// Extend the Express.Request interface to include userId, userRole, and files
declare global {
	namespace Express {
		interface Request {
			userId?: string; // Optional userId
			userRole?: string; // Optional userRole
			files?: FileArray | { [fieldname: string]: File[] } | undefined; // Properly type files
			file?: Express.Multer.File; // Optional: for single file upload
			body: any; // You can use a more specific type for the body
			params: { [key: string]: string }; // Ensure route params are available
			headers: { [key: string]: string }; // Add headers if you need to access request headers
		}
	}
}

// Create a new interface that extends Request and includes userId and userRole
export interface AuthenticatedRequest extends Request {
	userId?: string;
	userRole?: string;
}

export {};
