import { Request, Response } from "express";
import { FindAllUsers } from "../../application/use-cases/FindAllUsers";

export class FindAllUsersController {
  constructor(private findAllUsers: FindAllUsers) {}

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.findAllUsers.execute();
      res.json(users);
    } catch (error) {
      res.status(500).send("Error al recuperar los usuarios");
    }
  }
}
