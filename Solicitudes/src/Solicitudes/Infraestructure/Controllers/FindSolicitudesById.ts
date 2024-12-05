import { Request, Response } from 'express';
import { FindSolicitudesById } from '../../Application/use-case/FindSolicitudesById'; 

export class FindSolicitudesByIdController {
    private findSolicitudesById: FindSolicitudesById;

    constructor(findSolicitudesById: FindSolicitudesById) {
        this.findSolicitudesById = findSolicitudesById;
    }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID es requerido' });
        }

        try {
            const solicitud = await this.findSolicitudesById.execute(id);
            if (!solicitud) {
                return res.status(404).json({ message: 'Solicitud no encontrada' });
            }
            return res.status(200).json(solicitud);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}