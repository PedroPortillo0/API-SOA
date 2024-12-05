import { Pool } from "mysql2/promise";
import { CitasMascotas } from "../../Domain/Entities/CitasMascotas";
import { SolicitudesRepository } from "../../Domain/Repository/CitasMascotasRepository";

export class MysqlCitasMascotasRepository implements SolicitudesRepository {
  constructor(private pool: Pool) {}

  private mapRowToCita(row: any): CitasMascotas {
    const cita = new CitasMascotas(
      row.nombreDeLaMascota,
      row.mascotaId,
      row.motivoCita,
      row.fechaCita,
      row.comentario
    );
    cita.setId(row.id);
    return cita;
  }

  async save(cita: CitasMascotas): Promise<void> {
    const query = `
      INSERT INTO CitasMascotas (id, nombreDeLaMascota, mascotaId, motivoCita, fechaCita, comentario)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        nombreDeLaMascota = VALUES(nombreDeLaMascota),
        mascotaId = VALUES(mascotaId),
        motivoCita = VALUES(motivoCita),
        fechaCita = VALUES(fechaCita),
        comentario = VALUES(comentario);
    `;
    const values = [
      cita.getId(),
      cita.getNombreDeLaMascota(),
      cita.getMascotaId(),
      cita.getMotivoCita(),
      cita.getFechaCita(),
      cita.getComentario(),
    ];
    await this.pool.execute(query, values);
  }

  async findAll(): Promise<CitasMascotas[]> {
    const query = `SELECT * FROM CitasMascotas`;
    const [rows]: any = await this.pool.execute(query);
    return rows.map((row: any) => this.mapRowToCita(row));
  }

  async findById(id: string): Promise<CitasMascotas | null> {
    const query = `SELECT * FROM CitasMascotas WHERE id = ?`;
    const [rows]: any = await this.pool.execute(query, [id]);
    if (rows.length > 0) {
      return this.mapRowToCita(rows[0]);
    }
    return null;
  }

  async update(id: string, citaActualizada: CitasMascotas): Promise<void> {
    const query = `
      UPDATE CitasMascotas
      SET nombreDeLaMascota = ?, mascotaId = ?, motivoCita = ?, fechaCita = ?, comentario = ?
      WHERE id = ?
    `;
    const values = [
      citaActualizada.getNombreDeLaMascota(),
      citaActualizada.getMascotaId(),
      citaActualizada.getMotivoCita(),
      citaActualizada.getFechaCita(),
      citaActualizada.getComentario(),
      id,
    ];
    await this.pool.execute(query, values);
  }
}
