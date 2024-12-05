import { Request, Response } from 'express';
import { FindCitasMascotasById } from '../../Application/use-case/findCitasMascotasById'; 

export class FindCitasMascotaByIdController {
    constructor(private findCitasMascotasById: FindCitasMascotasById) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const cita = await this.findCitasMascotasById.findById(id);
            if (cita) {
                return res.status(200).json(cita);
            } else {
                return res.status(404).json({ message: 'Cita no encontrada' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener la cita', error });
        }
    }
}