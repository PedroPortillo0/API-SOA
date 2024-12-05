import { SolicitudesRepository } from "../../Domain/Repository/SolicitudesRepository"; 
import { Solicitudes } from "../../Domain/Entities/Solicitudes"; 

export class FindAllSolicitudes {
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

    async getAllSolicitudes(): Promise<Solicitudes[]> {
        return await this.solicitudesRepository.findAll();
    }
}