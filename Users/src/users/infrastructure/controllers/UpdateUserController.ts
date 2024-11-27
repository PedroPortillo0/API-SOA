import { Request, Response } from "express";
import { UpdateUser } from "../../application/use-cases/UpdateUser";

export class UpdateUserController {
  constructor(private updateUser: UpdateUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        await this.updateUser.execute(id, updatedData);
        res.status(200).send("Usuario actualizado con éxito");
      } catch (error) {
        if (error instanceof Error && error.message === "User not found") {
          res.status(404).send("Usuario no encontrado");
        } else {
          res.status(500).send("Error al actualizar el usuario");
        }
      }
  }
}
