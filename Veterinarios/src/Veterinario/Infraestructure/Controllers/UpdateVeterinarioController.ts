
import { Request, Response } from 'express';
import { UpdateVeterinario } from '../../Application/use-case/UpdateVeterinario'; 
import { VeterinarioRepository } from '../../Domain/Repositories/VeterinarioRepository';

export class UpdateVeterinarioController {
  private updateVeterinario: UpdateVeterinario;

  constructor(veterinarioRepository: VeterinarioRepository) {
    this.updateVeterinario = new UpdateVeterinario(veterinarioRepository);
  }

  // Método para manejar la solicitud de actualización
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // ID del veterinario que se va a actualizar
    const updatedData = req.body; // Datos a actualizar (parciales)

    // Validación básica de los datos de entrada
    if (!id || typeof id !== 'string') {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }

    if (typeof updatedData !== 'object') {
      res.status(400).json({ message: 'Datos de actualización inválidos' });
      return;
    }

    try {
      // Llamamos al caso de uso para realizar la actualización
      await this.updateVeterinario.execute(id, updatedData);

      // Respondemos con un mensaje de éxito
      res.status(200).json({
        message: 'Veterinario actualizado correctamente',
      });
    } catch (error) {
      // Si ocurre un error, respondemos con el error
      res.status(400).json({
        message: error || 'Ocurrió un error al actualizar el veterinario',
      });
    }
  }
}