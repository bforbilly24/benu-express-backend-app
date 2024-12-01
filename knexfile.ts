import dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST || 'localhost',
			port: Number(process.env.DB_PORT) || 5432,
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASSWORD || 'postgres',
			database: process.env.DB_NAME || 'benu',
		},
		migrations: {
			directory: 'migrations',
		},
		seeds: {
			directory: 'seeds',
		},
	},
};

export default config;
