import { IUserRepository } from '../../Domain/Repositories/IUserRepository';
import { User } from '../../Domain/Models/User';
import client from '../../../Config/Db';

export class PostgresUserRepository implements IUserRepository {
    async create(user: User): Promise<User> {
        const query = `INSERT INTO users (uuid, email, password, created_at, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [user.uuid, user.email, user.password, user.createdAt, user.isVerified];

        try {
            const result = await client.query(query, values);
            console.log("Usuario creado exitosamente");
            return result.rows[0];
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const query = `SELECT * FROM users WHERE email = $1`;
        try {
            const result = await client.query(query, [email]);
            return (result && result.rows && result.rows.length > 0) ? result.rows[0] : null;
        } catch (error) {
            console.error("Error al buscar el usuario por email:", error);
            throw error;
        }
    }

    async updateUserFromLead(uuid: string, leadData: any): Promise<void> {
        const query = `UPDATE users SET email = $1, first_name = $2, last_name = $3, phone = $4 WHERE uuid = $5`;
        const values = [leadData.email, leadData.firstName, leadData.lastName, leadData.phone, uuid];
        try {
            await client.query(query, values);
            console.log("Usuario actualizado con datos de lead");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw error;
        }
    }

    async verifyUser(uuid: string): Promise<void> {
        const query = `UPDATE users SET is_verified = true WHERE uuid = $1`;
        try {
            await client.query(query, [uuid]);
            console.log("Usuario verificado");
        } catch (error) {
            console.error("Error al verificar el usuario:", error);
            throw error;
        }
    }

    public async findByUuid(uuid: string): Promise<User | null> {
        try {
            const result = await client.query('SELECT * FROM users WHERE uuid = $1', [uuid]);
            if (result.rows.length > 0) {
                const userRow = result.rows[0];
                const user = new User(
                    userRow.uuid,
                    userRow.email,
                    userRow.password,
                    userRow.created_at,
                    userRow.is_verified
                );
                return user;
            }
            return null;
        } catch (error) {
            console.error('Error al buscar el usuario por UUID:', error);
            throw error;
        }
    }

    public async save(user: User): Promise<void> {
        // Lógica para guardar o actualizar un usuario en la base de datos
    }
}
