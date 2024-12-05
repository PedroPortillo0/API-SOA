import { CitasMascotas } from "../../Domain/Entities/CitasMascotas"; 
import { SolicitudesRepository } from "../../Domain/Repository/CitasMascotasRepository"; 

export class FindAllCitasMascotas implements SolicitudesRepository {
    private citas: CitasMascotas[] = [];

    async save(cita: CitasMascotas): Promise<void> {
        this.citas.push(cita);
    }

    async findAll(): Promise<CitasMascotas[]> {
        return this.citas;
    }

    async findById(id: string): Promise<CitasMascotas | null> {
        const cita = this.citas.find(c => c.getId() === id);
        return cita || null;
    }

    async update(id: string, citaActualizada: CitasMascotas): Promise<void> {
        const index = this.citas.findIndex(c => c.getId() === id);
        if (index !== -1) {
            this.citas[index] = citaActualizada;
        }
    }
}