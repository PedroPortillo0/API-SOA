import { LeadRepository } from '../../Domain/repositories/LeadRepository';
import { Lead } from '../../Domain/models/Lead';
import client from '../../../Config/Db';

export class PostgreSQLLeadRepository implements LeadRepository {
  
  async createLead(lead: Lead): Promise<void> {
    const query = `
      INSERT INTO lead (uuid, email, first_name, last_name, phone, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    try {
      await client.query(query, [
        lead.uuid,
        lead.email,
        lead.firstName,
        lead.lastName,
        lead.phone,
        lead.createdAt
      ]);
    } catch (error) {
      console.error("Error en createLead:", error);
      throw new Error("Error al registrar el lead en la base de datos");
    }
  }
  

  async findLeadByEmail(email: string): Promise<Lead | null> {
    const query = 'SELECT * FROM lead WHERE email = $1';
    const { rows } = await client.query(query, [email]);

    if (rows.length === 0) return null;

    const row = rows[0];
    return new Lead(
      row.id,
      row.uuid,
      row.email,
      row.first_name,
      row.last_name,
      row.phone,
      row.created_at,
    );
  }

  async findLeadByUuid(uuid: string): Promise<Lead | null> {
    const query = 'SELECT * FROM lead WHERE uuid = $1';
    const { rows } = await client.query(query, [uuid]);

    if (rows.length === 0) return null;

    const row = rows[0];
    return new Lead(
      row.id,
      row.uuid,
      row.email,
      row.first_name,
      row.last_name,
      row.phone,
      row.created_at,
    );
  }
}
