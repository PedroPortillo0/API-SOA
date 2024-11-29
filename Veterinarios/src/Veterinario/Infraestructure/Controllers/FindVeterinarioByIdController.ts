import { Request, Response } from "express";
import { FindVeterinarioById } from "../../Application/use-case/FindVeterinarioById"; 

export class FindVeterinarioByIdController {
  constructor(private findVeterinarioById: FindVeterinarioById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await this.findVeterinarioById.execute(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("veterinario no encontrado");
      }
    } catch (error) {
      console.error("Error al recuperar el veterinario por ID:", error); // Log de error
      res.status(500).send("Error al recuperar el veterinario");
    }
  }
}
