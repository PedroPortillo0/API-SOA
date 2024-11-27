import { ContactVeterinario } from "../../Domain/entities/ContactVeteriario";
import { ContactVeterinarioRepository } from "../../Domain/repositories/ContactVeterinarioRepository";
import { NotificationEvent } from "../../../_shared/Domain/events/NotificationEvent";

export class SaveContactVeterinario {
  constructor(
    private ContactVeterinarioRepository: ContactVeterinarioRepository,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    ubicacion:string
  ): Promise<ContactVeterinario> {
    const contact = new ContactVeterinario(firstName, lastName, email, phone, ubicacion);
    await this.ContactVeterinarioRepository.save(contact);

    const message =
      "¡Bienvenido! Complete su registro para disfrutar de nuestros servicios.";

    const event = new NotificationEvent(
      contact.getId(),
      "Contact",
      email,
      phone,
      message,
      "EMAIL",
      "NORMAL"
    );

    await this.eventPublisher(event);
    return contact;
  }
}
