import { Contact } from "../../domain/entities/Contact";
import { ContactRepository } from "../../domain/repositories/ContactRepository";

export class FindContactByEmail {
  constructor(private contactRepository: ContactRepository) {}

  async execute(email: string): Promise<Contact | null> {
    return this.contactRepository.findByEmail(email);
  }
}
