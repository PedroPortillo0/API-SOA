import { ContactVeterinario } from "../../Domain/entities/ContactVeteriario";
import { ContactVeterinarioRepository } from "../../Domain/repositories/ContactVeterinarioRepository";

export class FindContactById {
  constructor(private contactRepository: ContactVeterinarioRepository) {}

  async execute(id: string): Promise<ContactVeterinario | null> {
    return this.contactRepository.findById(id);
  }
}
