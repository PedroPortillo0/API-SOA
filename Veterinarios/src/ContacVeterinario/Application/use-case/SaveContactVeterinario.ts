import { ContactVeterinario } from "../../Domain/Entities/ContacVeterinario"; 
import { ContactVeterinarioRepository } from "../../Domain/Repositories/ContactVeterinarioRepository"; 
import { NotificationEvent } from "../../../_shared/Domain/events/NotificationEvent"; 

export class SaveContactVeterinario {
  constructor(
    private contactVeterinarioRepository: ContactVeterinarioRepository,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    ubication: string
  ): Promise<ContactVeterinario> {
    const contactVeterinario = new ContactVeterinario(firstName, lastName, email, phone, ubication);
    await this.contactVeterinarioRepository.save(contactVeterinario);

    const message =
      "¡Bienvenido! Complete su registro para disfrutar de nuestros servicios.";

    const event = new NotificationEvent(
    contactVeterinario.getId(),
      "Contact",
      email,
      phone,
      message,
      "EMAIL",
      "NORMAL"
    );

    await this.eventPublisher(event);
    return contactVeterinario;
  }
}
