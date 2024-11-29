import { Request, Response } from "express";
import { FindContactVeterinarioByEmail } from "../../Application/use-case/FindContactVeterinarioByEmail";

export class FindContactVeterinarioByEmailController {
  constructor(private findContactVeterinarioByEmail: FindContactVeterinarioByEmail) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const contact = await this.findContactVeterinarioByEmail.execute(email);
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).send("Contacto no encontrado");
      }
    } catch (error) {
      console.error(`Error al recuperar el contacto con email ${email}:`, error); // Log del error
      res.status(500).send("Error al recuperar el contacto");
    }
  }
}
