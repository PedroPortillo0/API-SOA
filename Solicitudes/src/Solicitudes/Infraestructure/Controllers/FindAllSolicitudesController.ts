import { Request, Response } from 'express';
import { FindAllSolicitudes } from '../../Application/use-case/FindAllSolicitued'; 

export class FindAllSolicitudesController {
    private findAllSolicitudes: FindAllSolicitudes;

    constructor(findAllSolicitudes: FindAllSolicitudes) {
        this.findAllSolicitudes = findAllSolicitudes;
    }

    async handle(_req: Request, res: Response): Promise<Response> {
        try {
            const solicitudes = await this.findAllSolicitudes.getAllSolicitudes();
            return res.status(200).json(solicitudes);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}