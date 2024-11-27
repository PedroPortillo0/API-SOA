import { Pool } from "mysql2/promise";
import { ContactVeterinario } from "../../Domain/entities/ContactVeteriario";
import { ContactVeterinarioRepository } from "../../Domain/repositories/ContactVeterinarioRepository";

export class MySQLContactRepository implements ContactVeterinarioRepository {
  constructor(private pool: Pool) {}

  private mapRowToContact(row: any): ContactVeterinario {
    return new ContactVeterinario(
      row.first_name,
      row.last_name,
      row.email,
      row.phone,
      row.status,
      row.id
    );
  }

  async save(ContactVeterinario: ContactVeterinario): Promise<void> {
    const query = `
      INSERT INTO contactveterinario (id, first_name, last_name, email, phone, ubicacion, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        email = VALUES(email),
        phone = VALUES(phone),
        ubicacion = VALUES(ubicacion),
        status = VALUES(status);
    `;
    const values = [
        ContactVeterinario.getId(),
        ContactVeterinario.getFirstName(),
        ContactVeterinario.getLastName(),
        ContactVeterinario.getEmail(),
        ContactVeterinario.getPhone(),    
        ContactVeterinario.getUbicacion(),
        ContactVeterinario.getStatus(),
    ];
    await this.pool.execute(query, values);
  }

  async findAll(): Promise<ContactVeterinario[]> {
    const query = `SELECT * FROM contactveterinario`;
    const [rows] = await this.pool.execute(query);
    return (rows as any[]).map((row) => this.mapRowToContact(row));
  }

  async findById(id: string): Promise<ContactVeterinario | null> {
    const query = `SELECT * FROM contactveterinario WHERE id = ?`;
    const [rows] = await this.pool.execute(query, [id]);
    if ((rows as any[]).length === 0) {
      return null;
    }
    return this.mapRowToContact((rows as any[])[0]);
  }

  async findByEmail(email: string): Promise<ContactVeterinario | null> {
    const query = `SELECT * FROM contactveterinario WHERE email = ?`;
    const [rows] = await this.pool.execute(query, [email]);
    if ((rows as any[]).length === 0) {
      return null;
    }
    return this.mapRowToContact((rows as any[])[0]);
  }

  async deleteById(id: string): Promise<void> {
    const query = `DELETE FROM contactveterinario WHERE id = ?`;
    await this.pool.execute(query, [id]);
  }
}
