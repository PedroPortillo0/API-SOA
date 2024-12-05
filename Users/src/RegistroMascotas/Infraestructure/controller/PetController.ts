import { Request, Response } from "express";

export class PetController {
  constructor(private readonly registerPetUseCase: any) {}

  async registerPet(req: Request, res: Response): Promise<void> {
    try {
      // Verificar que el archivo fue cargado
      if (!req.file) {
        throw new Error("La imagen es requerida.");
      }

      // Procesar la imagen
      const imageBuffer = req.file.buffer;

      // Obtener el ID del usuario desde los parámetros
      const userId = req.params.userId;

      // Preparar los datos de la mascota
      const petData = {
        ...req.body,
        imageFile: imageBuffer, // Buffer de la imagen para subir
      };

      // Ejecutar el caso de uso
      await this.registerPetUseCase.execute(userId, petData);

      // Responder al cliente con éxito
      res.status(201).json({
        message: "Evento de mascota publicado exitosamente.",
      });
    } catch (error: any) {
      console.error("Error al registrar la mascota:", error.message);
      res.status(400).json({ error: error.message });
    }
  }
}
