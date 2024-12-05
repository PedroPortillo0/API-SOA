import { CitasMascotas } from "../../Domain/Entities/CitasMascotas";
import { SolicitudesRepository } from "../../Domain/Repository/CitasMascotasRepository";

export class FindCitasMascotasById {
    constructor(private citasMascotasRepository: SolicitudesRepository) {}

    async findById(id: string): Promise<CitasMascotas | null> {
        return await this.citasMascotasRepository.findById(id);
    }
}