import { VeterinarioRepository } from "../../Domain/Repositories/VeterinarioRepository"; 

export class DeleteVeterinarioById {
  constructor(private veterinarioRepository: VeterinarioRepository) {}

  async execute(id: string): Promise<void> {
    await this.veterinarioRepository.deleteById(id);
  }
}
