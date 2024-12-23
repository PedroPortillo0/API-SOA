import { v4 as uuidv4 } from 'uuid';

export class CitasMascotas {
    private id: string;
    private nombreDeLaMascota: string;
    private mascotaId: string;
    private motivoCita: string;
    private fechaCita: Date;
    private horaCita: string;
    private comentario: string;

    constructor(
        nombreDeLaMascota: string,
        mascotaId: string,
        motivoCita: string,
        fechaCita: Date,
        horaCita: string,
        comentario: string
    ) {
        this.id = uuidv4();
        this.nombreDeLaMascota = nombreDeLaMascota;
        this.mascotaId = mascotaId;
        this.motivoCita = motivoCita;
        this.fechaCita = fechaCita;
        this.horaCita = horaCita;
        this.comentario = comentario;
    }

    public getId(): string {
        return this.id;
    }

    public getNombreDeLaMascota(): string {
        return this.nombreDeLaMascota;
    }

    public getMascotaId(): string {
        return this.mascotaId;
    }

    public getMotivoCita(): string {
        return this.motivoCita;
    }

    public getFechaCita(): Date {
        return this.fechaCita;
    }

    public getHoraCita(): string {
        return this.horaCita;
    }

    public getComentario(): string {
        return this.comentario;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setNombreDeLaMascota(nombreDeLaMascota: string): void {
        this.nombreDeLaMascota = nombreDeLaMascota;
    }

    public setMascotaId(mascotaId: string): void {
        this.mascotaId = mascotaId;
    }

    public setMotivoCita(motivoCita: string): void {
        this.motivoCita = motivoCita;
    }

    public setFechaCita(fechaCita: Date): void {
        this.fechaCita = fechaCita;
    }

    public setHoraCita(horaCita: string): void {
        this.horaCita = horaCita;
    }

    public setComentario(comentario: string): void {
        this.comentario = comentario;
    }
}