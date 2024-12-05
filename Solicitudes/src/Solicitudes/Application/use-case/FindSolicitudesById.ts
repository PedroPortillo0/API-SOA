import { SolicitudesRepository } from "../../Domain/Repository/SolicitudesRepository"; 
import { Solicitudes } from "../../Domain/Entities/Solicitudes"; 

export class FindSolicitudesById {
    private solicitudesRepository: SolicitudesRepository;

    constructor(solicitudesRepository: SolicitudesRepository) {
        this.solicitudesRepository = solicitudesRepository;
    }

    async execute(id: string): Promise<Solicitudes | null> {
        return await this.solicitudesRepository.findById(id);
    }
}