import bcrypt from 'bcrypt';
import knexDb from '../configs/knex-config';

export class UserModel {
	static async createUser(role: 'user' | 'admin', email?: string, password?: string) {
		const hashedPassword = password ? await bcrypt.hash(password, 10) : null; 

		const userData: any = {
			role,
			email: role === 'admin' ? email : null, 
			password: role === 'admin' ? hashedPassword : null, 
			created_at: new Date(),
			updated_at: new Date(),
		};

		const [newUser] = await knexDb('users').insert(userData).returning('*');
		return newUser;
	}

	static async findById(id: string) {
		const user = await knexDb('users').where({ id }).first();
		return user;
	}

	static async findByEmail(email: string) {
		const user = await knexDb('users').where({ email }).first();
		return user;
	}

	static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(plainPassword, hashedPassword);
	}

	static async findByRole(role: 'user' | 'admin') {
		const user = await knexDb('users').where({ role }).first();
		return user;
	}
}
