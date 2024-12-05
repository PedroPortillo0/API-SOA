import { CitasMascotas } from "../Entities/CitasMascotas"; 

export interface SolicitudesRepository{
    save(user: CitasMascotas): Promise<void>;
    findAll(): Promise<CitasMascotas[]>;
    findById(id: string): Promise<CitasMascotas | null>;
    update(id: string, veterinario: CitasMascotas): Promise<void>; 
}