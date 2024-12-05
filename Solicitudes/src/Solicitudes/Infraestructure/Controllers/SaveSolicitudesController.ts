import { Request, Response } from 'express';
import { SaveSolicitudes } from '../../Application/use-case/SaveSolicitudes';

export class SaveSolicitudesController {
    private saveSolicitudes: SaveSolicitudes;

    constructor(saveSolicitudes: SaveSolicitudes) {
        this.saveSolicitudes = saveSolicitudes;
    }

    async handle(req: Request, res: Response): Promise<Response> {
        const { veterinarioid, userid } = req.body;

        if (!veterinarioid || !userid) {
            return res.status(400).json({ message: 'Veterinario ID y Usuario ID son requeridos' });
        }

        try {
            await this.saveSolicitudes.saveSolicitud(veterinarioid, userid);
            return res.status(201).json({ message: 'Solicitud guardada correctamente' });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}