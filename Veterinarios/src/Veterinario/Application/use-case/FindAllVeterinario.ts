import { Veterinario } from "../../Domain/Entities/Veterinario"; 
import { VeterinarioRepository } from "../../Domain/Repositories/VeterinarioRepository"; 

export class FindAllVeterinario {
  constructor(private veterinarioRepository: VeterinarioRepository) {}

  async execute(): Promise<Veterinario[]> {
    return this.veterinarioRepository.findAll();
  }
}
