import { Request, Response } from "express";
import { SendPasswordResetCode } from "../../application/use-cases/PasswordGmailValider";

export class SendPasswordResetCodeController {
  constructor(private sendPasswordResetCode: SendPasswordResetCode) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email, userId } = req.body;

      // Validar que ambos campos están presentes
      if (!email || !userId) {
        res.status(400).json({
          error: "Los campos 'email' y 'userId' son requeridos",
        });
        return;
      }

      // Ejecutar el caso de uso
      await this.sendPasswordResetCode.execute(email, userId);

      // Responder con éxito
      res
        .status(200)
        .json({ message: "Código de verificación enviado con éxito" });
    } catch (error: any) {
      // Manejar errores y devolver la respuesta adecuada
      res
        .status(400)
        .json({ error: error.message || "Error interno del servidor" });
    }
  }
}
