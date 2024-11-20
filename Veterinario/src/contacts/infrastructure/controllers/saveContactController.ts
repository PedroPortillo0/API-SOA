import { Request, Response } from "express";
import { SaveContact } from "../../application/use-cases/SaveContact";

export class SaveContactController {
  constructor(private saveContact: SaveContact) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, phone } = req.body;
    try {
      const contact = await this.saveContact.execute(
        firstName,
        lastName,
        email,
        phone
      );
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).send("Error al guardar el contacto");
    }
  }
}
