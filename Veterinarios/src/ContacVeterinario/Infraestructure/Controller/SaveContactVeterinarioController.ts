import { Request, Response } from "express";
import { SaveContactVeterinario } from "../../Application/use-case/SaveContactVeterinario";

export class SaveContactVeterinarioController {
  constructor(private saveContactVeterinario: SaveContactVeterinario) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, phone, ubication } = req.body;
    try {
      const contact = await this.saveContactVeterinario.execute(
        firstName,
        lastName,
        email,
        phone,
        ubication
      );
      res.status(201).json(contact);
    } catch (error) {
      // Log de error con el mensaje del error
      console.error("Error al guardar el contacto:", error);
      res.status(500).send("Error al guardar el contacto");
    }
  }
}
