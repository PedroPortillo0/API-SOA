import { UserRepository } from "../../../users/domain/repositories/UserRepository";
import { ContactRepository } from "../../../contacts/domain/repositories/ContactRepository";
import { NotificationEvent } from "../../../_shared/domain/events/NotificationEvent";

export class VerifyUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly contactRepository: ContactRepository,
    private readonly eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    user.verifyUser();

    const contact = user.getContact();
    contact.promoteToUser();

    await this.userRepository.save(user);
    await this.contactRepository.save(contact);

    const message =
      "¡Bienvenido!";

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
