"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solicitudes = void 0;
const uuid_1 = require("uuid");
class Solicitudes {
    constructor(veterinarioid, userid, status = "pendiente") {
        this.id = (0, uuid_1.v4)();
        this.veterinarioid = veterinarioid;
        this.userid = userid;
        this.status = status;
    }
    getId() {
        return this.id;
    }
    getveterinarioid() {
        return this.veterinarioid;
    }
    getveuserid() {
        return this.userid;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
}
exports.Solicitudes = Solicitudes;
