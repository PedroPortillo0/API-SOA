import { Request, Response } from 'express';
import { UpdateSolicitudes } from '../../Application/use-case/UpdateSolicitudes'; 

export class UpdateSolicitudesController {
    private updateSolicitudes: UpdateSolicitudes;

    constructor(updateSolicitudes: UpdateSolicitudes) {
        this.updateSolicitudes = updateSolicitudes;
    }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || !status) {
            return res.status(400).json({ message: 'ID y estado son requeridos' });
        }

        if (status !== 'aceptado' && status !== 'rechazado') {
            return res.status(400).json({ message: 'Estado inválido' });
        }

        try {
            await this.updateSolicitudes.execute(id, status);
            return res.status(200).json({ message: 'Estado de la solicitud actualizado correctamente' });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}