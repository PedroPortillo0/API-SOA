import { ContactVeterinario } from "../../Domain/Entities/ContacVeterinario"; 
import { ContactVeterinarioRepository } from "../../Domain/Repositories/ContactVeterinarioRepository"; 

export class FindAllContactsVeterinario {
  constructor(private contactVeterinarioRepository: ContactVeterinarioRepository) {}

  async execute(): Promise<ContactVeterinario[]> {
    return this.contactVeterinarioRepository.findAll();
  }
}
