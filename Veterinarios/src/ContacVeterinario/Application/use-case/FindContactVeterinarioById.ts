import { ContactVeterinario } from "../../Domain/Entities/ContacVeterinario"; 
import { ContactVeterinarioRepository } from "../../Domain/Repositories/ContactVeterinarioRepository"; 

export class FindContactVeterinarioById {
  constructor(private contactVeterinarioRepository: ContactVeterinarioRepository) {}

  async execute(id: string): Promise<ContactVeterinario | null> {
    return this.contactVeterinarioRepository.findById(id);
  }
}
