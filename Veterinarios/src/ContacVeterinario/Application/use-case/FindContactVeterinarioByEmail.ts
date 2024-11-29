import { ContactVeterinario } from "../../Domain/Entities/ContacVeterinario"; 
import { ContactVeterinarioRepository } from "../../Domain/Repositories/ContactVeterinarioRepository"; 

export class FindContactVeterinarioByEmail {
  constructor(private contactVeterinarioRepository: ContactVeterinarioRepository) {}

  async execute(email: string): Promise<ContactVeterinario | null> {
    return this.contactVeterinarioRepository.findByEmail(email);
  }
}
