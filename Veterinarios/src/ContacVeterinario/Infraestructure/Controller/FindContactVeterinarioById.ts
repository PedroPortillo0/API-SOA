import { Request, Response } from "express";
import { FindContactVeterinarioById } from "../../Application/use-case/FindContactVeterinarioById";

export class FindContactVeterinarioByIdController {
  constructor(private findContactVeterinarioById: FindContactVeterinarioById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const contact = await this.findContactVeterinarioById.execute(id);
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).send("Contacto no encontrado");
      }
    } catch (error) {
      // Log del error
      console.error(`Error al recuperar el contacto con ID ${id}:`, error);
      res.status(500).send("Error al recuperar el contacto");
    }
  }
}
