import knexDb from '../configs/knex-config';

export class ItemModel {
	static async createItem(data: { title: string; description: string; location: string; claim: boolean }) {
		const [newItem] = await knexDb('item').insert(data).returning('*');
		return newItem;
	}

	static async getItemById(id: number) {
		const item = await knexDb('item').where({ id }).first();
		return item;
	}

	static async updateItem(id: number, data: { title?: string; description?: string; location?: string; claim?: boolean }) {
		const [updatedItem] = await knexDb('item').where({ id }).update(data).returning('*');
		return updatedItem;
	}

	static async getAllItems() {
		return knexDb('item').select('*');
	}
}
