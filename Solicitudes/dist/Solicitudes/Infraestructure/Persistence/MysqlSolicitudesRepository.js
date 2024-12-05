"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlSolicitudesRepository = void 0;
const Solicitudes_1 = require("../../Domain/Entities/Solicitudes");
class MysqlSolicitudesRepository {
    constructor(pool) {
        this.pool = pool;
    }
    save(solicitud) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO solicitudes (id, veterinarioid, userid, status)
            VALUES (?, ?, ?, ?)
        `;
            const values = [solicitud.getId(), solicitud.getveterinarioid(), solicitud.getveuserid(), solicitud.getStatus()];
            yield this.pool.execute(query, values);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.pool.query('SELECT * FROM solicitudes');
            return rows.map(row => new Solicitudes_1.Solicitudes(row.veterinarioid, row.userid, row.status));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.pool.query('SELECT * FROM solicitudes WHERE id = ?', [id]);
            const solicitud = rows[0];
            if (!solicitud) {
                return null;
            }
            return new Solicitudes_1.Solicitudes(solicitud.veterinarioid, solicitud.userid, solicitud.status);
        });
    }
    update(id, solicitud) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE solicitudes
            SET veterinarioid = ?, userid = ?, status = ?
            WHERE id = ?
        `;
            const values = [solicitud.getveterinarioid(), solicitud.getveuserid(), solicitud.getStatus(), id];
            yield this.pool.execute(query, values);
        });
    }
}
exports.MysqlSolicitudesRepository = MysqlSolicitudesRepository;
