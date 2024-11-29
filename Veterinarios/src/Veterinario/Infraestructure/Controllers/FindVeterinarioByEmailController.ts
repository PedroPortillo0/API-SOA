import { Request, Response } from "express";
import { FindVeterinarioByEmail } from "../../Application/use-case/FindVeterinarioByEmail"; 

export class FindVeterinarioByEmailController {
  constructor(private findVeterinarioByEmail: FindVeterinarioByEmail) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const user = await this.findVeterinarioByEmail.execute(email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("Veterinario no encontrado");
      }
    } catch (error) {
      console.error("Error al recuperar el veterinario por email:", error); // Log de error
      res.status(500).send("Error al recuperar el veterinario");
    }
  }
}
