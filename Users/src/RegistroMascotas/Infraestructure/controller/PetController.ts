import { Request, Response } from "express";
import { RegisterPet } from "../../Application/RegisterPet";

export class PetController {
  constructor(private readonly registerPetUseCase: RegisterPet) {} 

  async registerPet(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const petData = req.body;

      await this.registerPetUseCase.execute(userId, petData); 
      res.status(201).json({ message: "Evento de mascota publicado exitosamente." });
    } catch (error: any) { // Añadimos "any" para tipar el error y evitar conflictos
      res.status(400).json({ error: error.message });
    }
  }
}
