import { Request, Response } from "express";
import { FindAllVeterinario } from "../../Application/use-case/FindAllVeterinario"; 

export class FindAllVeterinarioController {
  constructor(private findAllVeterinario: FindAllVeterinario) {}

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.findAllVeterinario.execute();
      res.json(users);
    } catch (error) {
      console.error("Error al recuperar los veterinarios:", error); // Log de error
      res.status(500).send("Error al recuperar los veterinarios");
    }
  }
}
