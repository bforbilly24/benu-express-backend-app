import bcrypt from 'bcrypt';
import { Knex } from 'knex';

export const seed = async (knex: Knex): Promise<void> => {
	// Hash the password for the admin user
	const hashedPassword = await bcrypt.hash('Admin123,', 10);

	await knex('users').insert([
		{
			role: 'admin',
			email: 'firstadmin@mail.com',
			password: hashedPassword,
			created_at: new Date(),
			updated_at: new Date(),
		},
	]);
};
