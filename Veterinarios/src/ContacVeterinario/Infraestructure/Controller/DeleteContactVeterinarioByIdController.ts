import { Request, Response } from "express";
import { DeleteContacVeterinariotById } from "../../Application/use-case/DeleteContactVeterinarioById";

export class DeleteContactVeterinarioByIdController {
  constructor(private deleteContacVeterinariotById: DeleteContacVeterinariotById) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.deleteContacVeterinariotById.execute(id);
      res.status(204).send();
    } catch (error) {
      console.error(`Error al eliminar el contacto con id ${id}:`, error); // Aquí logeamos el error
      res.status(500).send("Error al eliminar el contacto");
    }
  }
}
