import { VeterinarioRepository } from "../../Domain/Repositories/VeterinarioRepository"; 

export class UpdateVeterinario {
  constructor(private veterinarioRepository: VeterinarioRepository) {}

  async execute(id: string, updatedData: { cedulaVerified?: "NoVerificado" | "Verificado"; password?: string }): Promise<void> {
    // Verifica que el id sea válido (por ejemplo, si es un UUID)
    if (!this.isValidId(id)) {
      throw new Error("Formato de ID inválido");
    }

    // Buscar al veterinario por id
    const user = await this.veterinarioRepository.findById(id);
    if (!user) {
      throw new Error("Veterinario no encontrado");
    }

    // Actualizar los datos del veterinario
    if (updatedData.cedulaVerified) {
      user.verificarCedula();
    }

    if (updatedData.password) {
      user.updatePassword(updatedData.password);
    }

    await this.veterinarioRepository.update(id, user);
  }

  // Método para verificar si el id es válido (por ejemplo, un UUID)
  private isValidId(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    return uuidRegex.test(id);
  }
}