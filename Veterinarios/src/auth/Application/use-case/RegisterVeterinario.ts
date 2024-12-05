import { VeterinarioRepository } from "../../../Veterinario/Domain/Repositories/VeterinarioRepository"; 
import { ContactVeterinarioRepository } from "../../../ContacVeterinario/Domain/Repositories/ContactVeterinarioRepository"; 
import { Veterinario } from "../../../Veterinario/Domain/Entities/Veterinario"; 
import { HashService } from "../../Domain/services/HashService"; 
import { NotificationEvent } from "../../../_shared/Domain/events/NotificationEvent"; 
import { uploadImageToS3 } from "../../../_shared/services/s3UploadService"; 

export class RegisterVeterinario {
  constructor(
    private veterinarioRepository: VeterinarioRepository,
    private contactVeterinarioRepository: ContactVeterinarioRepository,
    private hashService: HashService,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(
    contactId: string,
    imageFile: Buffer, 
    password: string,
    cedulaVerified:"NoVerificado",
  ): Promise<Veterinario> {
    // Buscar contacto
    const contact = await this.contactVeterinarioRepository.findById(contactId)
    if (!contact) {
      console.error(`Contacto con ID ${contactId} no encontrado.`);
      throw new Error("Contacto del veterinario no encontrado.");
    }
    console.log(`Estado del contacto encontrado: ${contact.getStatus()}`);
    if (contact.getStatus() !== "LEAD") {
      console.error(`El contacto no tiene estado LEAD, tiene el estado: ${contact.getStatus()}`);
      throw new Error("Contacto del veterinario ya registrado o no válido.");
    }

    // Subir la imagen a S3 y obtener la URL
    const imageName = `${Date.now()}-veterinario.jpeg`;  // Nombre único para la imagen
    const imageUrl = await uploadImageToS3(imageFile, imageName);  // Subir imagen y obtener la URL

    // Hash de la contraseña
    const hashedPassword = await this.hashService.hash(password);

    // Crear el objeto Veterinario con la URL de la imagen
    const user = new Veterinario(imageUrl, hashedPassword, cedulaVerified, contact);

    // Guardar el veterinario en el repositorio
    await this.veterinarioRepository.save(user);

    // Mensaje de bienvenida
    const message = "¡Bienvenido! Aquí está su código de verificación para activar su cuenta";

    // Crear el evento de notificación
    const event = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "WHATSAPP",
      "2FA"
    );

    // Publicar el evento de notificación
    await this.eventPublisher(event);

    return user;
  }
}
