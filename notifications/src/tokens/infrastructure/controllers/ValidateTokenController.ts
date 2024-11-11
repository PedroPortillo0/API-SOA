import { Request, Response } from "express";
import { ValidateToken } from "../../application/use-cases/ValidateToken";

export class ValidateTokenController {
  constructor(private validateToken: ValidateToken) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { userId, code } = req.body;

    if (!userId || !code) {
      res.status(400).send({ error: "Se requieren userId y code" });
      return;
    }

    try {
      const isValid = await this.validateToken.execute(userId, code);
      if (isValid) {
        res.status(200).send({ message: "El token es válido" });
      } else {
        res.status(400).send({ error: "Token inválido" });
      }
    } catch (error) {
      console.error("Error al validar el token:", error);
      res.status(500).send({ error: "Error al validar el token" });
    }
  }
}
