import { ContactVeterinarioRepository } from "../../Domain/Repositories/ContactVeterinarioRepository"; 

export class DeleteContacVeterinariotById {
  constructor(private contactVeterinarioRepository: ContactVeterinarioRepository) {}

  async execute(id: string): Promise<void> {
    await this.contactVeterinarioRepository.deleteById(id);
  }
}
