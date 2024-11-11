import { Contact } from "../../domain/entities/Contact";
import { ContactRepository } from "../../domain/repositories/ContactRepository";

export class FindAllContacts {
  constructor(private contactRepository: ContactRepository) {}

  async execute(): Promise<Contact[]> {
    return this.contactRepository.findAll();
  }
}
