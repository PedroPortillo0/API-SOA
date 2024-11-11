import { Request, Response } from "express";
import { FindUserByUsername } from "../../application/use-cases/FindUserByUsername";

export class FindUserByUsernameController {
  constructor(private findUserByUsername: FindUserByUsername) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    try {
      const user = await this.findUserByUsername.execute(username);
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
