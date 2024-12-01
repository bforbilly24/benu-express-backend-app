// migrations/[timestamp]_create_item_image_table.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('item_image', (table) => {
		table.increments('id').primary(); // Auto-increment ID
		table.integer('item_id').unsigned().notNullable();
		table.foreign('item_id').references('item.id').onDelete('CASCADE');
		table.string('image_path').notNullable(); // Path to image file
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('item_image');
}
