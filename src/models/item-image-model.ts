import fs from 'fs';
import path from 'path';
import knexDb from '../configs/knex-config';

export class ItemImageModel {
	static async createItemImage(itemId: number, imagePath: string) {
		const [newImage] = await knexDb('item_image').insert({ item_id: itemId, image_path: imagePath }).returning('*');
		return newImage;
	}

	static async getImagesByItemId(itemId: number) {
		console.log('Querying images for item_id:', itemId);
		return knexDb('item_image').where({ item_id: itemId });
	}

	static async deleteImagesByItemId(itemId: number): Promise<number> {
		const images = await knexDb('item_image').where({ item_id: itemId });

		if (images.length > 0) {
			for (const image of images) {
				const filePath = path.join(__dirname, '..', '..', image.image_path);
				console.log('Deleting file at:', filePath);

				try {
					await fs.promises.unlink(filePath);
				} catch (err) {
					console.error('Error deleting image file:', err);
				}
			}

			return knexDb('item_image').where({ item_id: itemId }).del();
		}

		return 0;
	}
}
