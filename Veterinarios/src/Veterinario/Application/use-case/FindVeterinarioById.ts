import { Veterinario } from "../../Domain/Entities/Veterinario"; 
import { VeterinarioRepository } from "../../Domain/Repositories/VeterinarioRepository"; 

export class FindVeterinarioById {
  constructor(private veterinarioRepository: VeterinarioRepository) {}

  async execute(id: string): Promise<Veterinario | null> {
    return this.veterinarioRepository.findById(id);
  }
}
