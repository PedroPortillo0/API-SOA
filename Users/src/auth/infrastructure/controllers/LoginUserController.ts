import { Request, Response } from "express";
import { LoginUser } from "../../application/use-cases/LoginUser";

export class LoginUserController {
  constructor(private loginUser: LoginUser) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { identifier, password } = req.body;
    try {
      const user = await this.loginUser.execute(identifier, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).send("Credenciales inválidas");
    }
  }
}
