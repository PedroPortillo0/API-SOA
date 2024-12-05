import { CitasMascotas } from "../../Domain/Entities/CitasMascotas";
import { SolicitudesRepository } from "../../Domain/Repository/CitasMascotasRepository";

export class SaveCitasMascotas {
    constructor(private citasMascotasRepository: SolicitudesRepository) {}

    async save(cita: CitasMascotas): Promise<void> {
        try {
            await this.citasMascotasRepository.save(cita);
            console.log('Cita guardada exitosamente:', cita);
        } catch (error) {
            console.error('Error al guardar la cita:', error);
            throw error;
        }
    }
}