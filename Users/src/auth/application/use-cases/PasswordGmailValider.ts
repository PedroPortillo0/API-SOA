import { ContactRepository } from "../../../contacts/domain/repositories/ContactRepository";
import { UserRepository } from "../../../users/domain/repositories/UserRepository";
import { NotificationEvent } from "../../../_shared/domain/events/NotificationEvent";

export class SendPasswordResetCode {
  constructor(
    private contactRepository: ContactRepository,
    private userRepository: UserRepository,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(email: string, userId: string): Promise<void> {
    // Verificar si el correo del contacto existe
    const contact = await this.contactRepository.findByEmail(email);
    if (!contact) {
      throw new Error("Correo del contacto no encontrado");
    }

    // Verificar que el contacto esté en estado USER
    if (contact.getStatus() !== "USER") {
      throw new Error("El contacto no está registrado como usuario");
    }

    // Verificar si el ID del usuario existe y está asociado a un usuario creado
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("El usuario con el ID proporcionado no existe");
    }

    // Generar el mensaje
    const message = "¡Hola! Tu código de verificación para cambiar tu contraseña es:";

    // Crear y enviar el evento de notificación
    const event = new NotificationEvent(
      user.getId(), // Usar el ID del usuario
      "User",
      contact.getEmail(),
      contact.getPhone(),
      message,
      "EMAIL",
      "2FA"
    );

    await this.eventPublisher(event);
  }
}
