import { v4 as uuidv4 } from 'uuid';

export class Solicitudes {
    private id: string;
    private veterinarioid: string;
    private userid: string;
    private status: "pendiente" | "aceptado" | "rechazado";

    constructor(
        veterinarioid: string,
        userid: string,
        status: "pendiente" | "aceptado" | "rechazado" = "pendiente"
    ) {
        this.id = uuidv4();
        this.veterinarioid = veterinarioid;
        this.userid = userid;
        this.status = status;
    }

    getId(): string {
        return this.id;
      }

    getveterinarioid():string{
        return this.veterinarioid;
    }
    getveuserid():string{
        return this.userid;
    }

    getStatus(): "pendiente" | "aceptado" | "rechazado" {
        return this.status;
    }

    setStatus(status: "pendiente" | "aceptado" | "rechazado"): void {
        this.status = status;
    }
}