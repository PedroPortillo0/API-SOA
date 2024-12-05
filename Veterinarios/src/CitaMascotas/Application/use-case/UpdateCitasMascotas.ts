import { CitasMascotas } from "../../Domain/Entities/CitasMascotas";
import { SolicitudesRepository } from "../../Domain/Repository/CitasMascotasRepository";

export class UpdateCitasMascotas {
    constructor(private citasMascotasRepository: SolicitudesRepository) {}

    async update(cita: CitasMascotas): Promise<void> {
        await this.citasMascotasRepository.update(cita.getId(), cita);
    }

    async findById(id: string): Promise<CitasMascotas | null> {
        return await this.citasMascotasRepository.findById(id);
    }
}