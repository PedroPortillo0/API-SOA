import { Request, Response } from "express";
import { DeleteVeterinarioById } from "../../Application/use-case/DeleteVeterinario"; 

export class DeleteVeterinarioByIdController {
  constructor(private deleteVeterinarioById: DeleteVeterinarioById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.deleteVeterinarioById.execute(id);
      res.status(201).send();
    } catch (error) {
      console.error("Error al eliminar el veterinario:", error); // Log de error
      res.status(500).send("Error al eliminar el veterinario");
    }
  }
}
