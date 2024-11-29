import { VeterinarioRepository } from "../../../Veterinario/Domain/Repositories/VeterinarioRepository"; 
import { ContactVeterinarioRepository } from "../../../ContacVeterinario/Domain/Repositories/ContactVeterinarioRepository";  
import { NotificationEvent } from "../../../_shared/Domain/events/NotificationEvent"; 

export class VerifyVeterinario {
  constructor(
    private readonly iVeterinarioRepository: VeterinarioRepository,
    private readonly contactVeterinarioRepository: ContactVeterinarioRepository,
    private readonly eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.iVeterinarioRepository.findById(userId);
    if (!user) {
      throw new Error("Veterinario no encontrado");
    }

    user.verifyUser();

    const contact = user.getContact();
    contact.promoteToUser();

    await this.iVeterinarioRepository.save(user);
    await this.contactVeterinarioRepository.save(contact);

    const message =
      "¡Bienvenido Estamos validando su CEDULA, esto puede tardar...";

    const welcomeEvent = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "EMAIL",
      "NORMAL"
    );

    await this.eventPublisher(welcomeEvent);
  }
}
