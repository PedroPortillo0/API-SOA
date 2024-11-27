import { Request, Response } from "express";
import { SaveContactVeterinario } from "../../Application/use-case/SaveContactVeterinario";

export class SaveContactVeterinarioController {
  constructor(private SaveContactVeterinario: SaveContactVeterinario) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, phone, ubicacion } = req.body;

    // Validar los datos de entrada
    if (!firstName || !lastName || !email || !phone || !ubicacion) {
      res.status(400).json({
        message: "Todos los campos son obligatorios: firstName, lastName, email, phone, ubicacion",
      });
      return;
    }        

    try {
      // Ejecutar el caso de uso
      const contact = await this.SaveContactVeterinario.execute(
        firstName,
        lastName,
        email,
        phone,
        ubicacion
      );

      // Responder con el contacto creado
      res.status(201).json(contact);
    } catch (error: any) {
      // Log detallado del error
      console.error("Error en SaveContactVeterinarioController:", error);

      // Respuesta al cliente
      res.status(500).json({
        message: "Error al guardar el contacto",
        error: error.message || "Error desconocido",
      });
    }
  }
}
