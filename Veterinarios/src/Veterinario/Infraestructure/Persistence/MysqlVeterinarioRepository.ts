import { Pool, RowDataPacket } from "mysql2/promise";
import { Veterinario } from "../../Domain/Entities/Veterinario";
import { VeterinarioRepository } from "../../Domain/Repositories/VeterinarioRepository";
import { ContactVeterinario } from "../../../ContacVeterinario/Domain/Entities/ContacVeterinario"; 

export class MysqlUserRepository implements VeterinarioRepository {
  constructor(private pool: Pool) {}

  // Mapeo de la fila de la base de datos a un objeto Veterinario
  private mapRowToUser(row: RowDataPacket): Veterinario {
    const contact = new ContactVeterinario(
      row.first_name,
      row.last_name,
      row.email,
      row.phone,
      row.ubication,
      row.status,
      row.contact_id // Asegúrate de que el campo coincida con el nombre real
    );
    return new Veterinario(row.username, row.password, row.ubication, contact, row.id, row.verified);
  }

  // Método para guardar un Veterinario
  async save(veterinario: Veterinario): Promise<void> {
    const query = `
      INSERT INTO veterinarios (id, image_url, password, cedulaVerified, contactveterinario_id, verified)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        image_url = VALUES(image_url),
        password = VALUES(password),
        cedulaVerified = VALUES(cedulaVerified),
        contactveterinario_id = VALUES(contactveterinario_id),
        verified = VALUES(verified);
    `;

    const values = [
      veterinario.getId(),
      veterinario.getImage() || null,
      veterinario.getPassword() || null,
      veterinario.getCedula() || null,
      veterinario.getContact().getId() || null,
      veterinario.getVerificationDate() || null,
    ];

    if (values.some(value => value === undefined)) {
      throw new Error("Uno o más valores son undefined");
    }

    await this.pool.execute(query, values);
  }

  // Método para obtener todos los veterinarios
  async findAll(): Promise<Veterinario[]> {
    const query = `
      SELECT v.*, c.first_name, c.last_name, c.email, c.phone, c.ubication, c.status
      FROM veterinarios v
      JOIN contactveterinario c ON v.contactveterinario_id = c.id
    `;
    const [rows] = await this.pool.execute(query);
    return (rows as RowDataPacket[]).map((row) => this.mapRowToUser(row));
  }

  // Método para encontrar un veterinario por ID
  async findById(id: string): Promise<Veterinario | null> {
    const query = `
      SELECT v.*, c.first_name, c.last_name, c.email, c.phone, c.ubication, c.status
      FROM veterinarios v
      JOIN contactveterinario c ON v.contactveterinario_id = c.id
      WHERE v.id = ?
    `;
    const [rows] = await this.pool.execute(query, [id]);
    const row = (rows as RowDataPacket[])[0];
    return row ? this.mapRowToUser(row) : null;
  }

  // Método para encontrar un veterinario por email
  async findByEmail(email: string): Promise<Veterinario | null> {
    const query = `
      SELECT v.*, c.first_name, c.last_name, c.email, c.phone, c.ubication, c.status
      FROM veterinarios v
      JOIN contactveterinario c ON v.contactveterinario_id = c.id
      WHERE c.email = ?
    `;
    const [rows] = await this.pool.execute(query, [email]);
    const row = (rows as RowDataPacket[])[0];
    return row ? this.mapRowToUser(row) : null;
  }

  // Método para eliminar un veterinario por ID
  async deleteById(id: string): Promise<void> {
    const query = `DELETE FROM veterinarios WHERE id = ?`;
    await this.pool.execute(query, [id]);
  }

  // Método para actualizar un veterinario en la base de datos
  async update(id: string, veterinario: Partial<Veterinario>): Promise<void> {
    const queryParts: string[] = [];
    const values: any[] = [];

    // Comprobamos qué campos existen en veterinario y los añadimos a la consulta
    if (veterinario.getImage?.()) {
      queryParts.push('image_url = ?');
      values.push(veterinario.getImage?.());
    }
    if (veterinario.getPassword?.()) {
      queryParts.push('password = ?');
      values.push(veterinario.getPassword?.());
    }
    if (veterinario.getCedula?.()) {
      queryParts.push('cedulaVerified = ?');
      values.push(veterinario.getCedula?.());
    }
    if (veterinario.getVerificationDate?.()) {
      queryParts.push('verified = ?');
      values.push(veterinario.getVerificationDate?.());
    }

    // Añadimos el id al final
    values.push(id);

    if (queryParts.length === 0) {
      throw new Error("No se proporcionaron campos para actualizar");
    }

    const query = `
      UPDATE veterinarios
      SET ${queryParts.join(', ')}
      WHERE id = ?
    `;

    await this.pool.execute(query, values);
  }
}