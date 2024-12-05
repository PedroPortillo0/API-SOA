import { Solicitudes } from "../Entities/Solicitudes";

export interface SolicitudesRepository{
    save(user: Solicitudes): Promise<void>;
    findAll(): Promise<Solicitudes[]>;
    findById(id: string): Promise<Solicitudes | null>;
    update(id: string, veterinario: Solicitudes): Promise<void>; 
}