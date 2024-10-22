import { Lead } from '../../Domain/models/Lead';
import { LeadRepository } from '../../Domain/repositories/LeadRepository';
import db from '../../../config/db';
import { RowDataPacket } from 'mysql2/promise'; 

export class MySQLLeadRepository implements LeadRepository {
  async createLead(lead: Lead): Promise<void> {
    const query = `
      INSERT INTO leads (uuid, email, first_name, last_name, phone, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      lead.uuid,
      lead.email,
      lead.firstName,
      lead.lastName,
      lead.phone,
      lead.createdAt
    ]);
  }

  async findLeadByEmail(email: string): Promise<Lead | null> {
    const query = 'SELECT * FROM leads WHERE email = ?';

    const [rows] = await db.query<RowDataPacket[]>(query, [email]);

    if (rows.length === 0) return null;

    const row = rows[0];

    return new Lead(
      row.id,
      row.uuid,
      row.email,
      row.first_name,
      row.last_name,
      row.phone,
      row.created_at
    );
  }
}
