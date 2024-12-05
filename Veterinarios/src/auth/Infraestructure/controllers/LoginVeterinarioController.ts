import { Request, Response } from "express";
import { LoginVeterinario } from "../../Application/use-case/LoginVeterinario"; 

export class LoginVeterinarioController {
  constructor(private loginVeterinario: LoginVeterinario) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { identifier, password } = req.body;

    // Log para saber qué datos se están recibiendo
    console.log(`Intentando iniciar sesión con el identificador: ${identifier}`);

    try {
      const veterinario = await this.loginVeterinario.execute(identifier, password);

      // Log cuando el usuario se autentica correctamente
      console.log(`Login exitoso para el veterinario con correo: ${identifier}`);

      res.status(200).json(veterinario);
    } catch (error) {
      // Log detallado para el error
      console.error(`Error al intentar iniciar sesión con el identificador: ${identifier}`, error);

      res.status(401).send("Credenciales inválidas");
    }
  }
}
