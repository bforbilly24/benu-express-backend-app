// middlewares/imageUploadMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

const imageUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.is('multipart/form-data')) {
		// The name 'images' must match the field name used in the form
		return upload.array('images', 2)(req, res, next); // Limiting to 2 images
	}
	next(); // If not multipart, proceed without uploading
};

export default imageUploadMiddleware;
