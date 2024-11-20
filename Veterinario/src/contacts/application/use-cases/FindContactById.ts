import { Contact } from "../../domain/entities/Contact";
import { ContactRepository } from "../../domain/repositories/ContactRepository";

export class FindContactById {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<Contact | null> {
    return this.contactRepository.findById(id);
  }
}
