// migrations/[timestamp]_create_item_table.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('item', (table) => {
		table.increments('id').primary(); // Auto-increment ID
		table.string('title').notNullable();
		table.string('description').notNullable();
		table.string('location').notNullable();
		table.boolean('claim').defaultTo(false); // Default to false
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('item');
}
