import { PetEvent } from "../../domain/events/PetEvent"; 
import { createRabbitMQChannel } from "../../../_config/rabbitmq.config";

export async function rabbitPetEventPublisher(event: PetEvent): Promise<void> {
    // Crear un canal de RabbitMQ
    const channel = await createRabbitMQChannel();

    // Crear el payload del evento basado en el objeto PetEvent
    const eventPayload = {
        id: event.id,
        name: event.name,
        species: event.species,
        breed: event.breed,
        birth_date: event.birth_date,
        weight: event.weight,
        height: event.height,
        gender: event.gender,
        allergies: event.allergies,
        sterilized: event.sterilized,
        userId: event.userId,
        imageUrl: event.imageUrl, // <-- Asegúrate de incluirlo aquí
    };

    // Configurar la cola
    await channel.assertQueue("service_pet", { durable: true });

    // Enviar el mensaje a la cola
    channel.sendToQueue(
        "service_pet",
        Buffer.from(JSON.stringify(eventPayload)),
        {
            persistent: true,
        }
    );
}

