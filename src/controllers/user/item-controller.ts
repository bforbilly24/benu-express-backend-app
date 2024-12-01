import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileHandler } from '../../handlers/file-handler';
import { ItemImageModel } from '../../models/item-image-model';
import { ItemModel } from '../../models/item-model';

export class ItemController {
	static async createItem(req: Request, res: Response): Promise<Response> {
		const { title, description, location, claim } = req.body;

		if (!title || !description || !location) {
			return res.status(400).json({ message: 'Title, description, and location are required.' });
		}

		const images = req.files as Express.Multer.File[];

		if (images && images.length > 3) {
			return res.status(400).json({ message: 'You can upload a maximum of 3 images.' });
		}

		try {
			const newItem = await ItemModel.createItem({
				title,
				description,
				location,
				claim: claim !== undefined ? claim : false,
			});

			let imagePaths: string[] = [];
			if (images && images.length > 0) {
				const savedImages = await fileHandler(images, newItem.id);
				imagePaths = savedImages.map((file) => file.image);
				for (const { image, item_id } of savedImages) {
					await ItemImageModel.createItemImage(item_id, image);
				}
			}

			return res.status(201).json({
				message: 'Item created successfully',
				item: newItem,
				images: imagePaths.map((path) => ({ image: path })),
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	}

	static async updateItem(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { title, description, location, claim } = req.body;
		const itemId = Number(id);

		if (isNaN(itemId)) {
			return res.status(400).json({ message: 'Invalid item ID.' });
		}

		if (!title && !description && !location && !req.files) {
			return res.status(400).json({ message: 'At least one field (title, description, location, or images) is required to update.' });
		}

		try {
			const existingItem = await ItemModel.getItemById(itemId);
			if (!existingItem) {
				return res.status(404).json({ message: 'Item not found.' });
			}

			const updatedItemData: any = {};
			if (title) updatedItemData.title = title;
			if (description) updatedItemData.description = description;
			if (location) updatedItemData.location = location;
			if (claim !== undefined) updatedItemData.claim = claim;

			const updatedItem = await ItemModel.updateItem(itemId, updatedItemData);

			let imagePaths: string[] = [];
			if (req.files && Array.isArray(req.files) && req.files.length > 0) {
				const existingImages = await ItemImageModel.getImagesByItemId(itemId);
				if (existingImages.length > 0) {
					for (const image of existingImages) {
						const filePath = path.join(__dirname, '..', '..', '..', image.image_path);
						console.log('Deleting file at:', filePath);
						try {
							await fs.promises.unlink(filePath); // Delete the file asynchronously
							await ItemImageModel.deleteImagesByItemId(image.item_id); // Remove image data from the DB
						} catch (err) {
							console.error('Error deleting old image file:', err);
						}
					}
				}

				// Save the new images
				const savedImages = await fileHandler(req.files as Express.Multer.File[], updatedItem.id);
				imagePaths = savedImages.map((file) => file.image);
				for (const { image, item_id } of savedImages) {
					await ItemImageModel.createItemImage(item_id, image); // Save new images to DB
				}
			}

			return res.status(200).json({
				message: 'Item updated successfully',
				item: updatedItem,
				images: imagePaths.map((path) => ({ image: path })),
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	}

	// Get item by ID
	static async getItemById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const itemId = Number(id);
		if (isNaN(itemId)) {
			return res.status(400).json({ message: 'Invalid item ID.' });
		}

		try {
			const item = await ItemModel.getItemById(itemId);
			if (!item) {
				return res.status(404).json({ message: 'Item not found.' });
			}

			const images = await ItemImageModel.getImagesByItemId(item.id);
			item.images = images;
			return res.status(200).json(item); 
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	}

	static async getAllItems(req: Request, res: Response): Promise<Response> {
		try {
			const items = await ItemModel.getAllItems();
			for (const item of items) {
				const images = await ItemImageModel.getImagesByItemId(item.id);
				item.images = images;
			}
			return res.status(200).json(items); 
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	}
}
