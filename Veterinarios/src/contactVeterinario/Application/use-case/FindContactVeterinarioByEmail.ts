import { ContactVeterinario } from "../../Domain/entities/ContactVeteriario";
import { ContactVeterinarioRepository } from "../../Domain/repositories/ContactVeterinarioRepository";

export class FindContactByEmail {
  constructor(private contactRepository: ContactVeterinarioRepository) {}

  async execute(email: string): Promise<ContactVeterinario | null> {
    return this.contactRepository.findByEmail(email);
  }
}
