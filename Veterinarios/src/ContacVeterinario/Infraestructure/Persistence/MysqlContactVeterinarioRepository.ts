import { Pool } from "mysql2/promise"; 
import { ContactVeterinario } from "../../Domain/Entities/ContacVeterinario"; 
import { ContactVeterinarioRepository } from "../../Domain/Repositories/ContactVeterinarioRepository"; 

export class MysqlContactRepository implements ContactVeterinarioRepository {
  constructor(private pool: Pool) {}

  private mapRowToContact(row: any): ContactVeterinario {
    return new ContactVeterinario(
      row.first_name,
      row.last_name,
      row.email,
      row.phone,
      row.ubication,
      row.status,
      row.id
    );
  }

  async save(contact: ContactVeterinario): Promise<void> {
    const query = `
    INSERT INTO contactveterinario (id, first_name, last_name, email, phone, ubication, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      first_name = VALUES(first_name),
      last_name = VALUES(last_name),
      email = VALUES(email),
      phone = VALUES(phone),
      ubication = VALUES(ubication),
      status = COALESCE(VALUES(status), status);
  `;
  
    const values = [
      contact.getId(),
      contact.getFirstName(),
      contact.getLastName(),
      contact.getEmail(),
      contact.getPhone(),
      contact.getUbication(),
      contact.getStatus(),
    ];
    await this.pool.execute(query, values);
  }

  async findAll(): Promise<ContactVeterinario[]> {
    const query = `SELECT * FROM contactveterinario`;
    try {
      const [rows]: any = await this.pool.execute(query);
      return (rows as any[]).map((row) => this.mapRowToContact(row));
    } catch (error) {
      console.error("Error al recuperar los contactos:", error);
      throw new Error("Error al recuperar los contactos.");
    }
  }

  async findById(id: string): Promise<ContactVeterinario | null> {
    const query = `SELECT * FROM contactveterinario WHERE id = ?`;
    const [rows]: any = await this.pool.execute(query, [id]);
    if (rows.length > 0) {
      return this.mapRowToContact(rows[0]);
    }
    return null;
  }

  async findByEmail(email: string): Promise<ContactVeterinario | null> {
    const query = `SELECT * FROM contactveterinario WHERE email = ?`;
    const [rows]: any = await this.pool.execute(query, [email]);
    if (rows.length > 0) {
      return this.mapRowToContact(rows[0]);
    }
    return null;
  }

  async deleteById(id: string): Promise<void> {
    const query = `DELETE FROM contactveterinario WHERE id = ?`;
    await this.pool.execute(query, [id]);
  }
}
