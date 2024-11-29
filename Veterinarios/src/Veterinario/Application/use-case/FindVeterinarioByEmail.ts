import { Veterinario } from "../../Domain/Entities/Veterinario"; 
import { VeterinarioRepository } from "../../Domain/Repositories/VeterinarioRepository"; 

export class FindVeterinarioByEmail {
  constructor(private veterinarioRepository: VeterinarioRepository) {}

  async execute(email: string): Promise<Veterinario | null> {
    return this.veterinarioRepository.findByEmail(email);
  }
}
