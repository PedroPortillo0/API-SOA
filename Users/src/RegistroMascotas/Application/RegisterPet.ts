import { PetEvent } from "../../_shared/domain/events/PetEvent";
import { UserRepository } from "../../users/domain/repositories/UserRepository";

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
    }
  ): Promise<void> {
    // Verificar si el usuario existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Crear el evento de mascota
    const petEvent = new PetEvent(
      undefined,
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
      userId // Asignar el ID del usuario como relación
    );

    // Publicar el evento en RabbitMQ
    await this.eventPublisher(petEvent);
  }
}
