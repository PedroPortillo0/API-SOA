import { Request, Response } from 'express';
import { UpdateCitasMascotas } from '../../Application/use-case/UpdateCitasMascotas'; 
import { CitasMascotas } from '../../Domain/Entities/CitasMascotas';

export class UpdateCitasMascotasController {
    constructor(private updateCitasMascotas: UpdateCitasMascotas) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { nombreDeLaMascota, mascotaId, motivoCita, fechaCita, horaCita, comentario } = req.body;

        try {
            const citaExistente = await this.updateCitasMascotas.findById(id);
            if (!citaExistente) {
                return res.status(404).json({ message: 'Cita no encontrada' });
            }

            const citaActualizada = new CitasMascotas(
                nombreDeLaMascota,
                mascotaId,
                motivoCita,
                fechaCita,
                horaCita,
                comentario
            );
            citaActualizada.setId(id);

            await this.updateCitasMascotas.update(citaActualizada);
            return res.status(200).json({ message: 'Cita actualizada exitosamente' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar la cita', error });
        }
    }
}