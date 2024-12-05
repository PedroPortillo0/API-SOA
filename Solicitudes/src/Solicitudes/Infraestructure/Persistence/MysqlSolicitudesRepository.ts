import { SolicitudesRepository } from "../../Domain/Repository/SolicitudesRepository";
import { Solicitudes } from "../../Domain/Entities/Solicitudes";
import { Pool } from 'mysql2/promise';

export class MysqlSolicitudesRepository implements SolicitudesRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async save(solicitud: Solicitudes): Promise<void> {
        const query = `
            INSERT INTO solicitudes (id, veterinarioid, userid, status)
            VALUES (?, ?, ?, ?)
        `;
        const values = [solicitud.getId(), solicitud.getveterinarioid(), solicitud.getveuserid(), solicitud.getStatus()];
        await this.pool.execute(query, values);
    }

    async findAll(): Promise<Solicitudes[]> {
        const [rows] = await this.pool.query('SELECT * FROM solicitudes');
        return (rows as any[]).map(row => new Solicitudes(row.veterinarioid, row.userid, row.status));
    }

    async findById(id: string): Promise<Solicitudes | null> {
        const [rows] = await this.pool.query('SELECT * FROM solicitudes WHERE id = ?', [id]);
        const solicitud = (rows as any[])[0];
        if (!solicitud) {
            return null;
        }
        return new Solicitudes(solicitud.veterinarioid, solicitud.userid, solicitud.status);
    }

    async update(id: string, solicitud: Solicitudes): Promise<void> {
        const query = `
            UPDATE solicitudes
            SET veterinarioid = ?, userid = ?, status = ?
            WHERE id = ?
        `;
        const values = [solicitud.getveterinarioid(), solicitud.getveuserid(), solicitud.getStatus(), id];
        await this.pool.execute(query, values);
    }
}