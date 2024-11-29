import { Pool } from "pg";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { Contact } from "../../../contacts/domain/entities/Contact";

export class PostgresUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  private mapRowToUser(row: any): User {
    const contact = new Contact(
      row.first_name,
      row.last_name,
      row.email,
      row.phone,
      row.status,
      row.contact_id
    );
    return new User(row.username, row.password, contact, row.id, row.verified);
  }

  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO users (id, username, password, contact_id, verified)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE
      SET username = EXCLUDED.username,
          password = EXCLUDED.password,
          contact_id = EXCLUDED.contact_id,
          verified = EXCLUDED.verified;
    `;
    const values = [
      user.getId(),
      user.getUsername(),
      user.getPassword(),
      user.getContact().getId(),
      user.getVerificationDate(),
    ];
    await this.pool.query(query, values);
  }

  async findAll(): Promise<User[]> {
    const query = `
      SELECT u.*, c.first_name, c.last_name, c.email, c.phone, c.status
      FROM users u
      JOIN contacts c ON u.contact_id = c.id
    `;
    const result = await this.pool.query(query);
    return result.rows.map((row) => this.mapRowToUser(row));
  }

  async findById(id: string): Promise<User | null> {
    const query = `
      SELECT u.*, c.first_name, c.last_name, c.email, c.phone, c.status
      FROM users u
      JOIN contacts c ON u.contact_id = c.id
      WHERE u.id = $1
    `;
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToUser(result.rows[0]);
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = `
      SELECT u.*, c.first_name, c.last_name, c.email, c.phone, c.status
      FROM users u
      JOIN contacts c ON u.contact_id = c.id
      WHERE u.username = $1
    `;
    const result = await this.pool.query(query, [username]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToUser(result.rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT u.*, c.first_name, c.last_name, c.email, c.phone, c.status
      FROM users u
      JOIN contacts c ON u.contact_id = c.id
      WHERE c.email = $1
    `;
    const result = await this.pool.query(query, [email]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToUser(result.rows[0]);
  }

  async deleteById(id: string): Promise<void> {
    const query = `DELETE FROM users WHERE id = $1`;
    await this.pool.query(query, [id]);
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    const query = `
      UPDATE users
      SET 
        username = COALESCE($2, username),
        password = COALESCE($3, password),
        contact_id = COALESCE($4, contact_id),
        verified = COALESCE($5, verified)
      WHERE id = $1
    `;
    
    const values = [
      id,
      user.getUsername ? user.getUsername() : null,
      user.getPassword ? user.getPassword() : null,
      user.getContact ? user.getContact().getId() : null,
      user.getVerificationDate ? user.getVerificationDate() : null,
    ];
  
    await this.pool.query(query, values);
  }
  
}
