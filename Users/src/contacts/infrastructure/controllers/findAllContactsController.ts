import { Request, Response } from "express";
import { FindAllContacts } from "../../application/use-cases/FindAllContacts";

export class FindAllContactsController {
  constructor(private findAllContacts: FindAllContacts) {}

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const contacts = await this.findAllContacts.execute();
      res.json(contacts);
    } catch (error) {
      res.status(500).send("Error al recuperar los contactos");
    }
  }
}
