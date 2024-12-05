import { Request, Response } from 'express';
import { FindAllCitasMascotas } from '../../Application/use-case/findAllCitasMascotas'; 

export class FindAllCitasMascotasController {
    constructor(private findAllCitasMascotas: FindAllCitasMascotas) {}

    async handle(_req: Request, res: Response): Promise<Response> {
        try {
            const citas = await this.findAllCitasMascotas.findAll();
            return res.status(201).json(citas);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener las citas', error });
        }
    }
}