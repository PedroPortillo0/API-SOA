import { Request, Response } from 'express';
import { SaveCitasMascotas } from '../../Application/use-case/SaveCitasMascotas'; 
import { CitasMascotas } from '../../Domain/Entities/CitasMascotas';

export class SaveCitasMascotaController {
    constructor(private saveCitasMascotas: SaveCitasMascotas) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { nombreDeLaMascota, mascotaId, motivoCita, fechaCita, comentario } = req.body;

        const nuevaCita = new CitasMascotas(nombreDeLaMascota, mascotaId, motivoCita, fechaCita, comentario);

        try {
            await this.saveCitasMascotas.save(nuevaCita);
            return res.status(201).json({ message: 'Cita guardada exitosamente' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al guardar la cita', error });
        }
    }
}