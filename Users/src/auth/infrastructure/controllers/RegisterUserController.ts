import { Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/RegisterUser";

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { contactId, username, password } = req.body;
    try {
      const user = await this.registerUser.execute(
        contactId,
        username,
        password
      );
      res.status(201).json({
        message: "Usuario creado exitosamente",
        user: {
          id: user.getId(),
          username: user.getUsername(),
          email: user.getContact().getEmail(),
          phone: user.getContact().getPhone(),
        },
      });
    } catch (error) {
      res.status(500).send("Error al guardar el usuario");
    }
  }
}
