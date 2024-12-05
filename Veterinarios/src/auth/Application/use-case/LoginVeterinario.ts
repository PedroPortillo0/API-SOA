import { VeterinarioRepository } from "../../../Veterinario/Domain/Repositories/VeterinarioRepository"; 
import { HashService } from "../../Domain/services/HashService"; 
import { Veterinario } from "../../../Veterinario/Domain/Entities/Veterinario"; 

export class LoginVeterinario {
  constructor(
    private iVeterinarioRepository: VeterinarioRepository,
    private hashService: HashService
  ) {}

  async execute(email: string, password: string): Promise<Veterinario | null> {
    // Buscar al usuario por correo
    const user = await this.iVeterinarioRepository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // Verificar si la cuenta está verificada
    if (!user.isVerified()) {
      throw new Error("Cuenta no verificada");
    }

    // Verificar si la cédula está validada
    if (user.getCedula() === "NoVerificado") {
      throw new Error("Estamos validando tu cédula, no puedes iniciar sesión todavía");
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await this.hashService.compare(password, user.getPassword());
    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    // Retornar el usuario autenticado
    return user;
  }
  
}
