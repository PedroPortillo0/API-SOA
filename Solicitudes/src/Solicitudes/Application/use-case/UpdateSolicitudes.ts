import { SolicitudesRepository } from "../../Domain/Repository/SolicitudesRepository"; 

export class UpdateSolicitudes {
    private solicitudesRepository: SolicitudesRepository;

    constructor(solicitudesRepository: SolicitudesRepository) {
        this.solicitudesRepository = solicitudesRepository;
    }

    async execute(id: string, status: "aceptado" | "rechazado"): Promise<void> {
        const solicitud = await this.solicitudesRepository.findById(id);
        if (!solicitud) {
            throw new Error("Solicitud no encontrada");
        }
        solicitud.setStatus(status);
        await this.solicitudesRepository.update(id, solicitud);
    }
}