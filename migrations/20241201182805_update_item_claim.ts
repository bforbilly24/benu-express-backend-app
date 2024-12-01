import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('item', (table) => {
		table.boolean('claim').defaultTo(false).alter();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('item', (table) => {
		table.boolean('claim').defaultTo(false).alter();
	});
}
