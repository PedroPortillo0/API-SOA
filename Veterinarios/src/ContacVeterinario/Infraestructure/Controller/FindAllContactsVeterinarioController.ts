import { Request, Response } from "express";
import { FindAllContactsVeterinario } from "../../Application/use-case/FindAllContactsVeterinarios";

export class FindAllContactsVeterinarioController {
  constructor(private findAllContactsVeterinario: FindAllContactsVeterinario) {}

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const contacts = await this.findAllContactsVeterinario.execute();
      res.json(contacts);
    } catch (error) {
      console.error("Error al recuperar los contactos:", error); // Log del error
      res.status(500).send("Error al recuperar los contactos");
    }
  }
}
