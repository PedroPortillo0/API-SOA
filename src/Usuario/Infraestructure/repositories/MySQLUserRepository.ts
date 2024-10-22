import { User } from '../../Domain/models/User';
import db from '../../../config/db';
import { UserRepository } from '../../Domain/repositories/UserRepository';
import { RowDataPacket } from 'mysql2/promise';

export class MySQLUserRepository implements UserRepository {
  async createUser(user: User): Promise<void> {
    const query = `
      INSERT INTO users (uuid, email, password, is_verified, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      user.uuid,
      user.email,
      user.password,
      user.isVerified,
      user.createdAt
    ]);
  }

  async saveTokenByUuid(uuid: string, token: string): Promise<void> {
    const query = `
      INSERT INTO tokens (token, user_id)
      SELECT ?, id FROM users WHERE uuid = ?
    `;
    await db.query(query, [token, uuid]);
  }

  async findTokenByUuid(uuid: string): Promise<any> {
    const query = `
      SELECT t.* FROM tokens t
      JOIN users u ON u.id = t.user_id
      WHERE u.uuid = ? ORDER BY t.created_at DESC LIMIT 1
    `;
    const [rows] = await db.query<RowDataPacket[]>(query, [uuid]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async verifyUserByUuid(uuid: string): Promise<void> {
    const query = 'UPDATE users SET is_verified = 1, verified_at = NOW() WHERE uuid = ?';
    await db.query(query, [uuid]);
  }
}
