import { PetEvent } from "../../_shared/domain/events/PetEvent";
import { UserRepository } from "../../users/domain/repositories/UserRepository";
import { uploadImageToS3 } from "../../_shared/services/s3UploadService";

export class RegisterPet {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventPublisher: (event: PetEvent) => Promise<void>
  ) {}

  async execute(
    userId: string,
    petData: {
      name: string;
      species: string;
      breed: string;
      birth_date: string;
      weight: number;
      height: number;
      gender: string;
      vaccines: string;
      allergies: string;
      sterilized: boolean;
      imageFile: Buffer; // Archivo de imagen en formato Buffer
    }
  ): Promise<void> {
    // Verificar si el usuario existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Generar un nombre único para la imagen
    const imageName = `${Date.now()}-${petData.name}.jpeg`;

    // Subir la imagen a S3 y obtener la URL
    const imageUrl = await uploadImageToS3(petData.imageFile, imageName);

    // Crear el evento de mascota con la URL de la imagen
    const petEvent = new PetEvent(
      undefined, // ID del evento (puedes generarlo si es necesario)
      petData.name,
      petData.species,
      petData.breed,
      petData.birth_date,
      petData.weight,
      petData.height,
      petData.gender,
      petData.vaccines,
      petData.allergies,
      petData.sterilized,
      userId,
      imageUrl // URL de la imagen generada en S3
    );

    // Publicar el evento en RabbitMQ para procesarlo y guardarlo en la base de datos
    await this.eventPublisher(petEvent);
  }
}
