// SaveSolicitudes.ts
import { SolicitudesRepository } from "../../Domain/Repository/SolicitudesRepository"; 
import { Solicitudes } from "../../Domain/Entities/Solicitudes";

export class SaveSolicitudes {
    private solicitudesRepository: SolicitudesRepository;

    constructor(solicitudesRepository: SolicitudesRepository) {
        this.solicitudesRepository = solicitudesRepository;
    }

    async getDatosSolicitud(id: string): Promise<{ userid: string, veterinarioid: string } | null> {
        const solicitud = await this.solicitudesRepository.findById(id);
        if (!solicitud) {
            return null;
        }
        return {
            userid: solicitud.getveuserid(),
            veterinarioid: solicitud.getveterinarioid()
        };
    }

    async saveSolicitud(veterinarioid: string, userid: string): Promise<void> {
        const solicitud = new Solicitudes(veterinarioid, userid);
        await this.solicitudesRepository.save(solicitud);
    }
}