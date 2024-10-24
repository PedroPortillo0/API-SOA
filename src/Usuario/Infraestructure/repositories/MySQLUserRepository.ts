import { User } from '../../Domain/models/User';
import { Lead } from '../../../Lead/Domain/models/Lead';
import db from '../../../config/db';
import { UserRepository } from '../../Domain/repositories/UserRepository';
import { RowDataPacket } from 'mysql2/promise';

export class MySQLUserRepository implements UserRepository {
  createUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

    async createUserFromLead(lead: Lead, hashedPassword: string): Promise<void> {
      const query = `
        INSERT INTO users (uuid, email, password, first_name, last_name, phone, is_verified, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await db.query(query, [
        lead.uuid,
        lead.email,
        hashedPassword,
        lead.firstName,
        lead.lastName,
        lead.phone,
        true,  // El usuario está verificado
        new Date()
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
      JOIN leads l ON l.uuid = t.lead_uuid
      WHERE l.uuid = ? ORDER BY t.created_at DESC LIMIT 1
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
