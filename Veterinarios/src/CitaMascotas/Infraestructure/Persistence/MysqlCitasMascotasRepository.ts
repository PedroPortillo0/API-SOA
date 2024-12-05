import { Pool } from 'mysql2/promise';
import { CitasMascotas } from '../../Domain/Entities/CitasMascotas';
import { SolicitudesRepository } from '../../Domain/Repository/CitasMascotasRepository';

export class MysqlCitasMascotasRepository implements SolicitudesRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    private mapRowToCita(row: any): CitasMascotas {
        const cita = new CitasMascotas(
            row.nombreDeLaMascota,
            row.mascotaId,
            row.motivoCita,
            new Date(row.fechaCita),
            row.horaCita,
            row.comentario
        );
        cita.setId(row.id);
        return cita;
    }

    async save(cita: CitasMascotas): Promise<void> {
        const query = `
            INSERT INTO CitasMascotas (id, nombreDeLaMascota, mascotaId, motivoCita, fechaCita, horaCita, comentario)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                nombreDeLaMascota = VALUES(nombreDeLaMascota),
                mascotaId = VALUES(mascotaId),
                motivoCita = VALUES(motivoCita),
                fechaCita = VALUES(fechaCita),
                horaCita = VALUES(horaCita),
                comentario = VALUES(comentario);
        `;
        const values = [
            cita.getId(),
            cita.getNombreDeLaMascota(),
            cita.getMascotaId(),
            cita.getMotivoCita(),
            cita.getFechaCita().toISOString().split('T')[0], // Convertir a formato YYYY-MM-DD
            cita.getHoraCita(),
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
        if (rows.length === 0) {
            return null;
        }
        return this.mapRowToCita(rows[0]);
    }

    async update(id: string, cita: CitasMascotas): Promise<void> {
        const query = `
            UPDATE CitasMascotas
            SET nombreDeLaMascota = ?, mascotaId = ?, motivoCita = ?, fechaCita = ?, horaCita = ?, comentario = ?
            WHERE id = ?
        `;
        const values = [
            cita.getNombreDeLaMascota(),
            cita.getMascotaId(),
            cita.getMotivoCita(),
            cita.getFechaCita().toISOString().split('T')[0], // Convertir a formato YYYY-MM-DD
            cita.getHoraCita(),
            cita.getComentario(),
            id,
        ];
        await this.pool.execute(query, values);
    }
}
