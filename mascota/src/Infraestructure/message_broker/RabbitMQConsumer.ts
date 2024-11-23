import { Channel } from "amqplib";
import { Pet } from "../../Domain/entities/Pet";
import { IPetRepository } from "../../Domain/Repositories/IPetRepository";

export class RabbitMQPetConsumer {
  constructor(private readonly channel: Channel, private readonly petRepository: IPetRepository) {}

  async startConsuming(): Promise<void> {
    const queue = "service_pet";

    // Asegurar que la cola existe
    await this.channel.assertQueue(queue, { durable: true });

    // Escuchar mensajes en la cola
    this.channel.consume(queue, async (message) => {
        if (message) {
          try {
            const eventPayload = JSON.parse(message.content.toString());
            console.log("Payload recibido:", eventPayload);
      
            // Validar que los campos no estén vacíos o undefined
            if (!eventPayload.name || !eventPayload.species || !eventPayload.userId) {
              throw new Error("Faltan campos obligatorios en el evento.");
            }
      
            // Crear la nueva mascota
            const pet = new Pet(
              undefined, // ID generado automáticamente en la base de datos
              eventPayload.name,
              eventPayload.species,
              eventPayload.breed,
              eventPayload.birth_date,
              eventPayload.weight,
              eventPayload.height,
              eventPayload.gender,
              eventPayload.vaccines,
              eventPayload.allergies,
              eventPayload.sterilized,
              eventPayload.userId,
              eventPayload.imageUrl // Guardar la URL de la imagen

            );
      
            // Guardar en la base de datos
            await this.petRepository.create(pet);
      
            // Confirmar el mensaje como procesado
            this.channel.ack(message);
          } catch (error) {
            console.error("Error al procesar el mensaje de RabbitMQ:", error);
            this.channel.nack(message, false, true); // Re-encolar el mensaje
          }
        }
      });
      
  }
}
