import { UserRepository } from "../../../users/domain/repositories/UserRepository";
import { ContactRepository } from "../../../contacts/domain/repositories/ContactRepository";
import { User } from "../../../users/domain/entities/User";
import { HashService } from "../../domain/services/HashService";
import { NotificationEvent } from "../../../_shared/domain/events/NotificationEvent";

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private contactRepository: ContactRepository,
    private hashService: HashService,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(
    contactId: string,
    username: string,
    password: string
  ): Promise<User> {
    const contact = await this.contactRepository.findById(contactId);
    if (!contact || contact.getStatus() !== "LEAD") {
      throw new Error("Contacto no encontrado o ya registrado como usuario");
    }

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) throw new Error("El nombre de usuario ya existe");

    const hashedPassword = await this.hashService.hash(password);
    const user = new User(username, hashedPassword, contact);
    
    await this.userRepository.save(user);

    const message =
      "¡Bienvenido! Aquí está su código de verificación para activar su cuenta";

    const event = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "WHATSAPP",
      "2FA"
    );

    await this.eventPublisher(event);

    return user;
  }
}