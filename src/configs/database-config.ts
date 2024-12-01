import dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config({ path: '.env.local' });

const pgp = pgPromise({});

const db = pgp({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	ssl: { rejectUnauthorized: false },
});

export default db;
