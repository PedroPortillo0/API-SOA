import { Request, Response } from "express";
import { FindUserByEmail } from "../../application/use-cases/FindUserByEmail";

export class FindUserByEmailController {
  constructor(private findUserByEmail: FindUserByEmail) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const user = await this.findUserByEmail.execute(email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      res.status(500).send("Error al recuperar el usuario");
    }
  }
}