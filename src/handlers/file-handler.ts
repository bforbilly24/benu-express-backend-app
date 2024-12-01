import fs from 'fs';
import path from 'path';

export const fileHandler = (files: Express.Multer.File[], serviceId: number): { image: string; item_id: number }[] => {
	const validExtensions = ['.jpg', '.jpeg', '.png'];

	if (files.length > 3) {
		throw new Error('Hanya diperbolehkan mengunggah maksimal 3 foto.');
	}

	const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'images');

	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
	}

	return files.map((file, i) => {
		const extension = path.extname(file.originalname).toLowerCase();

		if (!validExtensions.includes(extension)) {
			throw new Error('Format gambar tidak didukung. Hanya jpg, jpeg, dan png yang diperbolehkan.');
		}

		const filename = `${Date.now()}-${i}${extension}`;
		const imagePath = path.join('uploads', 'images', filename);
		const fullPath = path.join(uploadDir, filename);

		fs.writeFileSync(fullPath, file.buffer);

		return { image: imagePath, item_id: serviceId };
	});
};
