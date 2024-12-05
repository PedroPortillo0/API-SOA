import { CitasMascotas } from "../../Domain/Entities/CitasMascotas";
import { SolicitudesRepository } from "../../Domain/Repository/CitasMascotasRepository";

export class FindAllCitasMascotas {
    constructor(private citasMascotasRepository: SolicitudesRepository) {}

    async findAll(): Promise<CitasMascotas[]> {
        return await this.citasMascotasRepository.findAll();
    }
}