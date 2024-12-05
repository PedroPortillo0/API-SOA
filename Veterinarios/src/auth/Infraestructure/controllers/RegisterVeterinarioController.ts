import { Request, Response } from "express";
import { RegisterVeterinario } from "../../Application/use-case/RegisterVeterinario";

export class RegisterUserController {
  constructor(private registerVeterinario: RegisterVeterinario) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { contactId, imageFile, password } = req.body;

    // Log the incoming request data
    console.log("Request received:", { contactId });

    try {
      const user = await this.registerVeterinario.execute(
        contactId,
        imageFile,
        password,
        "NoVerificado"
      );

      // Log successful creation of a user
      console.log("User created successfully:", {
        id: user.getId(),
        email: user.getEmail(),
        phone: user.getPhone(),
      });

      res.status(201).json({
        message: "Veterinario creado exitosamente",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          phone: user.getPhone(),
        },
      });
    } catch (error) {
      // Log the error details for debugging
      console.error("Error while creating user:", error);

      res.status(500).send("Error al guardar el usuario");
    }
  }
}
